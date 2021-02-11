import express, { Request, Response } from "express";
import { investment } from "../../../models/Investments";
import { Role } from "../../../util";
import {
  currentUser,
  requireAuth,
  NotFoundError,
  roleBased,
  BadRequestError,
} from "@localmarket/common";
const Router = express.Router();

Router.get(
  "/api/admin/paid-investment",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const PaidInvestment = await investment.find({ payment: true });

    return res.send(PaidInvestment);
  }
);

export { Router as GetAllPaidInvestment };
