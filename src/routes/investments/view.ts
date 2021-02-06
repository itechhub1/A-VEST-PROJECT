import express, { Request, Response } from "express";
import { BadRequestError, currentUser, NotAuthorizeError, NotFoundError, requireAuth, roleBased } from "@localmarket/common";
import { Role } from "../../util";
import { investment as Investment } from "../../models/Investments";
const router = express.Router();

router.get(
  "/api/admin/investment/:id",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: Request, res: Response) => {

    const {id} = req.params
    const investment = await Investment.findById(id);
    if(!investment)throw new NotFoundError()
    /* Authorzaton line */
    if(investment.userId !==req.currentUser?.id) throw new NotAuthorizeError()

    return res.send(investment);
  }
);

export { router as ViewInvestment };
