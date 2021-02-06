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
    const investment = await Investment.find();
    return res.send(investment);
  }
);

export { router as AllAimartInvestment };
