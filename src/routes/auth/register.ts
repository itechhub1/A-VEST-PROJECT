import express, { Request, Response } from "express";
import { user } from "../../models/User";
import nodemailer from "nodemailer";
//@ts-ignore
import sendgridTransport from "nodemailer-sendgrid-transport";
import { ServerResponse } from "@localmarket/common";

const keys = require("../../config/keys");

import { randomBytes } from "crypto";
import { emailVerify } from "../../template";

import { body } from "express-validator";
import { BadRequestError, ValidationResult } from "@localmarket/common";
const router = express.Router();

//init transport api key
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: keys.sendGridKEY,
    },
  })
);

interface bodyRequest extends Request {
  body: { [keys: string]: string | undefined };
}

router.post(
  "/api/user/new",
  [
    body("email").isEmail().withMessage("email address is not valid"),
    body("firstname")
      .not()
      .isEmpty()
      .withMessage("firstname feild cannot be empty"),
    body("lastname")
      .not()
      .isEmpty()
      .withMessage("lastname feild cannot be empty"),

    body("password")
      .trim()
      .isLength({ min: 8, max: 12 })
      .withMessage("password must set between 8 or 12 characters"),
  ],
  ValidationResult,
  async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body;
     console.log(req.body);
     
    //genrating random string
    const randomString = randomBytes(8).toString("hex");

    //check if email, username are unique
    let _user = await user.findOne({ email });

    if (_user) throw new BadRequestError("email has been taken");

    const newUser = user.build({
      email,
      firstname,
      lastname,
      password,
      token: randomString,
    });

    await newUser.save();

    //sending email verification to client using sendgrid
    return transporter.sendMail(
      {
        to: `${newUser.email}`,
        from: "aimartrealtor@gmail.com",
        subject: "Registration Succeeded",
        html: emailVerify(newUser.firstname, newUser.token),
      },
      (err) => {
        if (!err) console.log(err);
        //throw new ServerResponse("network failure:Try again later", 500);
        return res
          .status(200)
          .send(
            "Account successfully created: Activate your account from your email"
          );
      

        //throw new ServerResponse("network connection failed", 500);
      }
    );
  }
);

export { router as AccountCreation };
