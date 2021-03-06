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

router.put(
  "/api/user/profile",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: Request, res: Response) => {
    const { dob, phonenumber, relationship, nationality } = req.body;
    const profile = await Profile.findById(req.currentUser?.id);
    if (!profile) return;
    /* authorizatin */
    if (profile._id !== req.currentUser?.id) throw new NotAuthorizeError();
    profile.set({
      dob,
      phonenumber,
      relationship,
      nationality,
    });

    return res.send(profile);
  }
);
