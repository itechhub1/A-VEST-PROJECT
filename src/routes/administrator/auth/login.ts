import express, { Response, Request } from "express";
import { body } from "express-validator";
import { Role } from "../../../util";
import { administrator } from "../../../models/admin";
import { transporter } from "../../../api";
import { TwoFATemplate } from "../../../template/2FAtemplate";

import speakEasy from "speakeasy";
import { BadRequestError, ValidationResult } from "@localmarket/common";

const router = express.Router();

router.post(
  "/api/admin-login",
  [
    body("email").not().isEmpty().withMessage("Email feild is required"),
    body("username").not().isEmpty().withMessage("Username field is empty"),
    body("password").not().isEmpty().withMessage("password field is empty"),
  ],
  ValidationResult,
  async (req: Request, res: Response) => {
    /* Generating speakEasy access secret */
    const secret = speakEasy.generateSecret({ length: 20 });

    const { username, password, email } = req.body;
    const adminUser = await administrator.findOne({ username });
    if (!adminUser) throw new BadRequestError(" UnAuthorize Access");
    if (adminUser.email !== email)
      throw new BadRequestError(" UnAuthorize Access");

    const isPasswordCorrect = await adminUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) throw new BadRequestError("  UnAuthorize Access");

    /* checking if 2FA is activated  and return early*/
    if (adminUser.twoFactor) {
      return res.send({ is2FA: adminUser.twoFactor, id: adminUser._id });
    }

    /* adding secret to administrative DB for first login and set 2FA true */
    adminUser.set({
      secret: secret.base32,
      twoFactor: true,
    });

    await adminUser.save();

    /* sending 2FA secret via email verification to client using sendgrid Email */
    return transporter.sendMail(
      {
        to: `${email}`,
        from: "aimartrealtor@gmail.com",
        subject: "One Time Access",
        html: TwoFATemplate(secret.base32),
      },
      (err) => {
        if (!err) {
          return res.send(
            "Initial login successfull: Follow the instructions in your mail"
          );
        }
        console.log("sendMail", err);

        //throw new Error(err.message);
      }
    );
  }
);

export { router as AdministratorLogin };
