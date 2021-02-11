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
  "/api/admin/terminated-investment-count",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const TerminatedInvestments = await investment.find({termination:true}).countDocuments();
    if (!TerminatedInvestments) return res.send({ count: 0 });
    return res.send({ count: TerminatedInvestments });
  }
);

export { Router as GetAllTerminatedInvestments };