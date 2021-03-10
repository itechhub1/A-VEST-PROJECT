///api/admin/search-investment/

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  currentUser,
  NotAuthorizeError,
  requireAuth,
  roleBased,
} from "@localmarket/common";
import { Role } from "../../../util";
import { investment as Investment } from "../../../models/Investments";
import { Route53Resolver } from "aws-sdk";
const router = express.Router();

router.post(
  "/api/admin/search-investment/",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    const { search } = req.body;

    /* check for validity of ObjectId */
    const isValid = mongoose.isValidObjectId(search);
    if (!isValid) throw new BadRequestError("incorrect investment Id");
    const investment = await Investment.findById(search).populate("users");
    if (!investment) throw new BadRequestError("No investment found");

    return res.send(investment);
  }
);

export { router as SearchInvestment };
