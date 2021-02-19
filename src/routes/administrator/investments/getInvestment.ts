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
  "/api/admin/all-investment",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const AllInvestment = await investment.find();

    return res.send(AllInvestment);
  }
);

export { Router as GetAllInvestment };
