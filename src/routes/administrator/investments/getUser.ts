import express, { Request, Response } from "express";
import { user as User } from "../../../models/User";
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
  "/api/admin/getinvestors",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const user = await User.find().sort('-createdAt');
  
    return res.send(user);
  }
);

export { Router as GetAllRegisteredUsers };