import express, { Request, Response } from "express";
import {
  NotAuthorizeError,
  BadRequestError,
  roleBased,
  currentUser,
  requireAuth,
  NotFoundError,
} from "@localmarket/common";
import { Role, InvesmentStatus } from "../../util";
import { investment as Investment } from "../../models/Investments";

const router = express.Router();

router.delete(
  "/api/investment/delete/:id",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const investment = await Investment.findById(id);
    if (!investment) throw new NotFoundError();
    investment.set({
      termination: true,
      status: InvesmentStatus.CANCELED,
    });

    await investment.save();

    res.send("Your investment as been succeefully cancelled.");
  }
);

export { router as OptOutInvestement };
