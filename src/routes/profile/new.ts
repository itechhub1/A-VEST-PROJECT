import express, { Request, Response } from "express";
import {
  BadRequestError,
  currentUser,
  NotAuthorizeError,
  requireAuth,
  roleBased,
} from "@localmarket/common";
import { profile as Profile } from "../../models/profile";
import { Role } from "../../util";

const router = express.Router();

router.post(
  "/api/user/profile",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: Request, res: Response) => {
    const { dob, phonenumber, relationship, nationality } = req.body;
    if (!req.currentUser?.id) throw new NotAuthorizeError();
    const profile = Profile.build({
      relationship,
      phonenumber,
      dob,
      nationality,
      _id: req.currentUser?.id,
    });

    await profile.save()
    return res.send(profile)
  }
);
