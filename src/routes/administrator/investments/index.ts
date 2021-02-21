import express, { Request, Response } from "express";
import {
  BadRequestError,
  currentUser,
  requireAuth,
  roleBased,
} from "@localmarket/common";
import { Role } from "../../../util";
import { investment as Investment } from "../../../models/Investments";
const router = express.Router();

router.get(
  "/api/admin/investment",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const MAX_NUMB_OF_PAGES = 10;
    //@ts-ignore
    const page: number = Math.max(0, req.query.page);

    const total = await Investment.find()
      .skip(MAX_NUMB_OF_PAGES * page)
      .countDocuments();

    const investment = await Investment.find()
      .sort('-createdAt')
      .limit(MAX_NUMB_OF_PAGES)
      .skip(MAX_NUMB_OF_PAGES * page)

      .populate("user");
    return res.send({ total, investment: investment });
  }
);

export { router as AllAimartInvestment };
