import express, { Request, Response } from "express";
import {
  currentUser,
  requireAuth,
  NotFoundError,
  roleBased,
} from "@localmarket/common";
import { administrator } from "../../../models/admin";
import { Role } from "../../../util";
const router = express.Router();

router.get(
  "/api/admin/currentuser",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    //console.log("jwt", req.session!.jwt);

    const credentials = await administrator.findById(req.currentUser?.id);
    if (!credentials) throw new NotFoundError();

    return res.send(credentials);
  }
);

export { router as AdmincurrentUser };
