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
  "/api/admin/expired-investment",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const MAX_NUMB_OF_PAGES = 10;
    //@ts-ignore
    const page: number = Math.max(0, req.query.page);

    const total = await investment
      .find()
      .skip(MAX_NUMB_OF_PAGES * page)
      .countDocuments();
    const ExpiredInvestment = await investment
      .find({
        investementExpired: true,
      })
      .sort("-createdAt")
      .limit(MAX_NUMB_OF_PAGES)
      .skip(MAX_NUMB_OF_PAGES * page)
      .populate("user");
    if (!ExpiredInvestment) throw new BadRequestError("No expired investement");
    return res.send({ total, investment: ExpiredInvestment });
  }
);

export { Router as GetAllExpiredInvestment };
