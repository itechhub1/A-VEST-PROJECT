import express, { Response, Request } from "express";
import { body } from "express-validator";
import { user as User } from "../../models/User";
import {
  requireAuth,
  currentUser,
  roleBased,
  BadRequestError,
  ValidationResult,
} from "@localmarket/common";
import { Role } from "../../util";

const router = express.Router();

router.put(
  "/api/user/change-login",
  currentUser,
  requireAuth,
  [
    body("newPassword").not().notEmpty().withMessage("password feild is empty"),
    body("oldPassword").not().notEmpty().withMessage("password feild is empty"),
  ],
  ValidationResult,

  roleBased([Role.USER]),
  async (req: Request, res: Response) => {
    const { newPassword, oldPassword } = req.body;

    //validating old password
    const user = await User.findById(req.currentUser?.id);
    if (!user) throw new BadRequestError("Error changing your login");

    //checking and comparing old password saved in db to input old password
    const passwordTrue = await user.isPasswordCorrect(oldPassword);
    if (!passwordTrue)
      throw new BadRequestError(
        "sorry you cannot update your password: Try Again Later."
      );

    /*  user.set({
        password: undefined,
      });
      await user.save(); */

    user.set({
      password: newPassword, // will hashing be applied ?
    });
    await user.save();
    res.send("credentials update successfully");
  }
);

export { router as UserUpdateCredentials };
