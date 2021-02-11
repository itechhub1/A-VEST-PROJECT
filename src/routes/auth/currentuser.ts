import express, { Request, Response } from "express";
import {
  currentUser,
  requireAuth,
  NotFoundError,
  roleBased,
} from "@localmarket/common";
import { user } from "../../models/User";
import { Role } from "../../util";
const router = express.Router();

router.get(
  "/api/user/currentuser",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: Request, res: Response) => {
    //console.log("jwt", req.session!.jwt);

    const credentials = await user.findById(req.currentUser?.id);
    if (!credentials) throw new NotFoundError();

    return res.send(credentials);
  }
);

export { router as AccountcurrentUser };
