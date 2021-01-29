import express, { Request, Response } from "express";
import { user } from "../../models/User";
import nodemailer from "nodemailer";
//@ts-ignore
import sendgridTransport from "nodemailer-sendgrid-transport";
import { ServerResponse } from "@localmarket/common";

const keys = require("../../../config/keys");

import { randomBytes } from "crypto";
import { verifyEmailTemplate } from "../../template/verificationTemplate";

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

router.post(
  "/api/user/new",
  [
    body("email").isEmail().withMessage("email address is not valid"),
    body("username")
      .not()
      .isEmpty()
      .withMessage("username feild cannot be empty"),
    body("firstname")
      .not()
      .isEmpty()
      .withMessage("firstname feild cannot be empty"),
    body("telephone")
      .not()
      .isEmpty()
      .withMessage("telephone feild cannot be empty"),
    body("lastname")
      .not()
      .isEmpty()
      .withMessage("lastname feild cannot be empty"),
    body("category")
      .not()
      .isEmpty()
      .withMessage("category feild cannot be empty"),

    body("password")
      .trim()
      .isLength({ min: 8, max: 12 })
      .withMessage("password must set between 8 or 12 characters"),
  ],
  ValidationResult,
  async (req: Request, res: Response) => {
    const {
      firstname,
      lastname,
      category,
      email,
      password,
      username,
      telephone,
    } = req.body;
    console.log(req.body);

    //genrating random string
    const randomString = randomBytes(8).toString("hex");

    //check if email, username are unique
    let _user = await user.findOne({ email });

    if (_user) throw new BadRequestError("email has been taken");

    _user = await user.findOne({ username });
    if (_user) throw new BadRequestError("username has been taken");

    let newUser = user.build({
      username,
      email,
      password,
      firstname,
      lastname,
      telephone,
      role: category,
      verifyToken: randomString,
    });
    await newUser.save();

    //sending email verification to client using sendgrid
    return transporter.sendMail(
      {
        to: `${newUser.email}`,
        from: "williamsadesina@ogunstate.gov.ng",
        subject: "Registration Succeeded",
        html: verifyEmailTemplate(randomString),
      },
      (err) => {
        if (!err)
          return res
            .status(200)
            .send(
              "Account successfully registered: Goto your email to verify your account"
            );

        throw new Error(err?.message);
      }
    );
  }
);

export { router as AccountCreation };
