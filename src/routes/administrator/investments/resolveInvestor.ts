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
  "/api/admin/resolve-roi/:id",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    
    const { id } = req.params;
    console.log(id);
    
    const investment = await Investment.findById(id);
    if (!investment) throw new NotFoundError();

    investment.set({
      cleared: true,
    });

    await investment.save();

    res.send("investment marked as resolved");
  }
);

export { router as ResolveInvestment };
