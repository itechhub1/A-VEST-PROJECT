import express, { Request, Response } from "express";
import { investment as Investment } from "./../../models/Investments";
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
    const { paymentRef, investmetId } = req.body;
    const investment = await Investment.findById(investmetId);
    if (!investment) throw new NotFoundError();

    /* Authorizations */

    if (investment.userId !== req.currentUser?.id)
      throw new NotAuthorizeError();

    investment.set({
      paymentRef,
      payment: true,
      status: InvesmentStatus.ACTIVE,
    });

    await investment.save();

    res.send("payment successfull: your investment status is active");
  }
);

export { router as AcknowlegdePayment };
