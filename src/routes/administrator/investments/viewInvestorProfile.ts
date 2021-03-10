import express, { Request, Response } from "express";
import {
  BadRequestError,
  currentUser,
  NotAuthorizeError,
  requireAuth,
  roleBased,
} from "@localmarket/common";
import { Role } from "../../../util";
import { profile } from "../../../models/profile";
const router = express.Router();

router.get(
  "/api/admin/investor-profile/:id",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);

    const Profile = await profile.findById(id).populate("users");
    if (!Profile) throw new BadRequestError("No Profile with this user found");

    return res.send(Profile);
  }
);

export { router as ViewInvestorProfile };
