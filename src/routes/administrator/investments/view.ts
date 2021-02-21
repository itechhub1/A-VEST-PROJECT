import express, { Request, Response } from "express";
import { BadRequestError, currentUser, NotAuthorizeError, requireAuth, roleBased } from "@localmarket/common";
import { Role } from "../../../util";
import { investment as Investment } from "../../../models/Investments";
const router = express.Router();

router.get(
  "/api/admin/investment/:id",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {

    const {id} = req.params
    console.log(id);
    
    const investment = await Investment.findById(id).populate('users');
    if(!investment) throw new BadRequestError('No investment with this user found')

    return res.send(investment);
  }
);

export { router as ViewInvestment };
