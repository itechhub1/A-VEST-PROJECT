import express, { Request, Response } from "express";
import { currentUser, requireAuth, roleBased } from "@localmarket/common";
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

    const investment = await Investment.find()
      .limit(MAX_NUMB_OF_PAGES)
      .skip(MAX_NUMB_OF_PAGES * page)
      .sort({ timestamp: "desc" })
      .populate("user");
    return res.send(investment);
  }
);

export { router as AllAimartInvestment };
