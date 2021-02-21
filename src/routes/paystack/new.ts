import express, { Request, Response } from "express";
import { investment as Investment } from "./../../models/Investments";
import moment, { Moment } from "moment";
import {
  BadRequestError,
  currentUser,
  NotAuthorizeError,
  NotFoundError,
  requireAuth,
  roleBased,
} from "@localmarket/common";
import { Role, InvesmentStatus } from "../../util";

const router = express.Router();

router.put(
  "/api/user/paystack",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: Request, res: Response) => {
    const { paymentRef, investmentId } = req.body;
    const investment = await Investment.findById(investmentId);
    if (!investment) throw new NotFoundError();

    /* Authorizations */

    if (investment.userId.toString() !== req.currentUser?.id.toString())
      throw new NotAuthorizeError();

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
      paymentRef,
      payment: true,
      status: InvesmentStatus.ACTIVE,
    });

    await investment.save();

    res.send("payment successfull: your investment status is active");
  }
);

export { router as AcknowlegdePayment };
