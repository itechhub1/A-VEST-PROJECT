import express, { Request, Response } from "express";
import { investment } from "../../../../models/Investments";
import {Role} from '../../../../util'
import {
  currentUser,
  requireAuth,
  NotFoundError,
  roleBased,
  BadRequestError,
} from "@localmarket/common";
const Router = express.Router();

Router.get(
  "/api/admin/expired-investment-count",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const ExpiredInvestment = await investment.find({investementExpired:true}).countDocuments();
    if (!ExpiredInvestment) return res.send({ count: 0 });
    return res.send({ count: ExpiredInvestment });
  }
);

export { Router as GetAllExpiredInvestmentCount };