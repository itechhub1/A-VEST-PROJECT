import express, { Request, Response } from "express";
import { user } from "../../../models/User";
import {Role} from '../../../util'
import {
  currentUser,
  requireAuth,
  NotFoundError,
  roleBased,
  BadRequestError,
} from "@localmarket/common";
const Router = express.Router();

Router.get(
  "/api/admin/count-user",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const Users = await user.find().countDocuments();
    if (!Users) return res.send({ count: 0 });
    return res.send({ count: Users });
  }
);

export { Router as GetAllUserCount };