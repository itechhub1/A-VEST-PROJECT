import express, { Request, Response } from "express";
import { investment } from "../../../models/Investments";
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
  "/api/admin/registered-investment",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const TerminatedInvestment = await investment.find().countDocuments();
    if (!TerminatedInvestment) return res.send({ count: 0 });
    return res.send({ count: TerminatedInvestment });
  }
);

export { Router as GetAllInvestment };