import express, { Request, Response } from "express";
import { investment as Investment } from "../../../models/Investments";
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
  "/api/admin/transfer-update",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const { paymentRef, investmetId } = req.body;
    const investment = await Investment.findById(investmetId);
    if (!investment) throw new NotFoundError();

    investment.set({
      paymentRef,
      payment: true,
      status: InvesmentStatus.ACTIVE,
    });

    await investment.save();

    res.send("user investment updated!!!");
  }
);

export { router as BankTransferUpdate };
