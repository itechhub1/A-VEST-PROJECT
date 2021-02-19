import express, { Request, Response } from "express";
import {
  BadRequestError,
  currentUser,
  NotAuthorizeError,
  requireAuth,
  roleBased,
} from "@localmarket/common";
import { Role } from "../../../util";
import { investment as Investment } from "../../../models/Investments";
import moment, { Moment } from "moment";
const router = express.Router();

const calculateNewROI = (percentage: number, roi: number) => {
  const newROi = (percentage / 100) * roi;
  return newROi + roi;
};

const extractNumbOfMonths = (percentage: string): number => {
  /* geting interger 18 from  35% 18months */
  const getCurrentMonth = parseInt(percentage.split(" ")[1].split("m")[0]);
  return getCurrentMonth;
};

const extractPercentageNumb = (percentage: string): number => {
  /* geting interger 18 from  35% 18months */
  return parseInt(percentage.split(" ")[0].split("%")[0]);
};

const extendExpiryInvestmentDate = (
  expiryDate: string,
  numberOfMonths: number
) => {
  const formatedData = moment(expiryDate)
    .format("DD-MM-YYYY")
    .split("-")
    .reverse()
    .join(",");

  return moment([formatedData]).add(numberOfMonths, "months");
};

router.put(
  "/api/admin/investment/:id",
  currentUser,
  requireAuth,
  roleBased([Role.ADMIN]),
  async (req: Request, res: Response) => {
    /* extendend month will be in this fomart eg "35% 18months" */
    const { extendedMonths } = req.body;

    const { id } = req.params;
    const investment = await Investment.findById(id);
    if (!investment) throw new NotAuthorizeError();

    if (investment.termination)
      throw new BadRequestError("The requested investor have self-terminate");
    if (investment.investementExpired)
      throw new BadRequestError("The investment as already expired");

    /* parseing the extended data */
    //console.log(moment('Thu Feb 04 2021 10:25:58 GMT+0100').format("DD-MM-YYYY").split("-").reverse().join("-"))
    /* console.log(moment([2021,02,04]).add(3,"months"))
Moment<2021-06-04T00:00:00+01:00>
 */
    const ExtendInvestmentDate = moment().add(
      extractNumbOfMonths(extendedMonths),
      "months"
    );

    /* updating the users investment extention */
    investment.set({
      expireTime: extendExpiryInvestmentDate(
        investment.expireTime,
        extractNumbOfMonths(extendedMonths)
      ),
      roi: calculateNewROI(
        extractPercentageNumb(extendedMonths),
        investment.roi
      ),
      percentage: extendedMonths,
    });

    await investment.save();

    return res.send(`Investment extended succesfully`);
  }
);

export { router as ExtentendInvestment };
