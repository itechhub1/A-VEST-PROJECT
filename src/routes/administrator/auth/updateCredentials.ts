import express, { Response, Request } from "express";
import { body } from "express-validator";
import { administrator } from "../../../models/admin";
import {
  requireAuth,
  currentUser,
  roleBased,
  BadRequestError,
  ValidationResult,
} from "@localmarket/common";
import { Role } from "../../../util";

const router = express.Router();

router.put(
  "/api/admin/change-login",
  currentUser,
  requireAuth,
  [
    body("username").not().notEmpty().withMessage("username feild is empty"),
    body("newPassword").not().notEmpty().withMessage("password feild is empty"),
    body("oldPassword").not().notEmpty().withMessage("password feild is empty"),
    body("email").not().notEmpty().withMessage("username feild is empty"),
  ],
  ValidationResult,

  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword, email, username } = req.body;

    //validating old password
    const adminUser = await administrator.findById(req.currentUser?.id);
    if (!adminUser) throw new BadRequestError("admin not found");

    //checking and comparing old password saved in db to input old password
    const passwordTrue = await adminUser.isPasswordCorrect(oldPassword);
    if (!passwordTrue)
      throw new BadRequestError(
        "sorry you cannot update your password: Try Again Later."
      );

    /*  adminUser.set({
        password: undefined,
      });
      await adminUser.save(); */

    adminUser.set({
      email,
      username,
      password: newPassword, // will hashing be applied ?
    });
    await adminUser.save();
    res.send("credentials update successfully");
  }
);

export { router as AdminUpdateCredentials };
