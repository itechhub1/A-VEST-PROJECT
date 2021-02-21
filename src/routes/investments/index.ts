import express, { Request, Response } from "express";
import { currentUser, requireAuth, roleBased } from "@localmarket/common";
import { Role } from "../../util";
import { investment as Investment } from "../../models/Investments";
const router = express.Router();

router.get(
  "/api/investment",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: Request, res: Response) => {
    const investment = await Investment.find({userId:req.currentUser?.id});
    if(!investment) return res.send([])
    return res.send(investment);
  }
);

export { router as AllInvestment };
