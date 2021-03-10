import express, { Request, Response } from "express";
import { investment as Investment } from "../../../models/Investments";
import moment, { Moment } from "moment";
import {
  BadRequestError,
  currentUser,
  NotAuthorizeError,
  NotFoundError,
  requireAuth,
  roleBased,
} from "@localmarket/common";
import { Role, InvesmentStatus } from "../../../util/index";

const router = express.Router();

router.put(
  "/api/admin/transfer-update/:id",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const investment = await Investment.findById(id);
    if (!investment) throw new NotFoundError();

    /* recalculate expiry date */
    const extractNumbOfMonths = (percentage: string): number => {
      /* geting interger 18 from  35% 18months */
      return parseInt(percentage.split(" ")[1].split("m")[0]);
    };

    investment.set({
      expireTime: moment().add(
        extractNumbOfMonths(investment.percentage),
        "months"
      ),
      payment: true,
      status: InvesmentStatus.ACTIVE,
    });

    await investment.save();

    res.send("user investment updated!!!");
  }
);

export { router as BankTransferUpdate };
