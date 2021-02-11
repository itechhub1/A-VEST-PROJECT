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
  "/api/admin/terminated-investment",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const TerminatedInvestment = await investment.find({termination:true})
    return res.send(TerminatedInvestment);
  }
);

export { Router as GetAllTerminatedInvestment };