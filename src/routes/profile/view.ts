import express, { Request, Response } from "express";
import {
  BadRequestError,
  currentUser,
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
    const { dob, phonenumber, relationship, nationslity } = req.body;
    const profile = await Profile.findById(req.currentUser?.id);
    if (!profile) throw new BadRequestError("Please complete your profile");

    return res.send(profile);
  }
);
