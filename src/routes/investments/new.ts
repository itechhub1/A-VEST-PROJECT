import express, { Request, Response } from "express";
import { investment } from "../../models/Investments";
import {
  ValidationResult,
  currentUser,
  requireAuth,
  roleBased,
  BadRequestError,
} from "@localmarket/common";
import { body, validationResult } from "express-validator";
import moment,{Moment} from "moment";
import { InvesmentStatus, Role } from "../../util";

const router = express();
interface expressRequestBody extends Request {
  body: { [keys: string]: string | undefined };
}
/* 
plan(pin):"Platinum Executive"
percentage(pin):"35% 18months"
amount(pin):"5000000"
roi(pin):"₦6,750,000"
fullname(pin):"Owoeye Oluwatosin Ajibola"
email(pin):"tohshine@gmail.com"
phonenumber(pin):"8060516515"
identity(pin):"International Passport"
employerCompany(pin):"eee"
occupationDesc(pin):"eeee"
nameOfKin(pin):"d"
addressOfKin(pin):"ddd"
phonenumberOfKin(pin):"ddd"
relationshipOfKin(pin):"ddd"
agreement(pin):true
paymentPlan(pin):"paystack" */





/* 

plan(pin):"Gold Basic"
percentage(pin):"10% 6months"
amount(pin):"1000000"
roi: "₦1,100,000"
fullname(pin):"Owoeye Oluwatosin Ajibola"
email(pin):"tohshine@gmail.com"
phonenumber(pin):"8060516515"
identity: "National ID"
employerCompany(pin):"eee"
occupationDesc(pin):"eeee"
nameOfKin(pin):"akin"
addressOfKin(pin):"kpk50"
phonenumberOfKin(pin):"0923474"
relationshipOfKin(pin):"married"
agreement(pin):true
paymentPlan(pin):"paystack"

*/

/* 
"expireTime":"2021-08-02",
 "addressOfKin":"KPK",
 "amount": 5000000,
 "relationshipOfKin":"single",
 "paymentPlan":"paystack",
 "phonenumber":"08138385529",
 "plan":"Gold basic",
 "identity":"volters card",
 "userId":"6019754ebfbd3d41d65a26af",
 "employerCompany":"Hi tech hub",
 "agreement":true,
 "occupationDesc":"programming school",
 "phonenumberOfKin":"0813997227",
 "roi": 65000000,
 "nextOfKin":"akin",
 "percentage":"10% 12months"

*/

const extractNumbOfMonths = (percentage: string): number => {
  /* geting interger 18 from  35% 18months */
  return parseInt(percentage.split(" ")[1].split("m")[0]);
};

router.post(
  "/api/investment/new",
  currentUser,
  requireAuth,
  roleBased([Role.USER]),
  async (req: expressRequestBody, res: Response) => {
    let futureExpirationDate : any;
    const {
      plan,
      percentage,
      amount,
      roi,
      fullname,
      email,
      phonenumber,
      employerCompany,
      occupationDesc,
      nextOfKin,
      addressOfKin,
      phonenumberOfKin,
      relationshipOfKin,
      agreement,
      paymentPlan,
    } = req.body;
    if (!req.body)  throw new BadRequestError('input cannot be empty')

    if (
      percentage &&
      relationshipOfKin &&
      plan &&
      amount &&
      roi &&
      fullname &&
      email &&
      phonenumber &&
  
      employerCompany &&
      occupationDesc &&
      nextOfKin &&
      addressOfKin &&
      phonenumberOfKin &&
      agreement &&
      paymentPlan
    ) {
      futureExpirationDate = moment().add(
        extractNumbOfMonths(percentage),
        "months"
      );

      const NewInvestment = investment.build({
        addressOfKin,
        agreement:true,
        amount:parseInt(amount),
        email,
        fullname,
        expireTime: futureExpirationDate,
        relationshipOfKin,
        paymentPlan,
        phonenumber,
        plan,
       
        userId: req.currentUser?.id,
        employerCompany,
        occupationDesc,
        phonenumberOfKin,
        roi:parseInt(roi),
        nextOfKin,
        percentage,
      });

      await NewInvestment.save();
      res.send("Form submitted succesfully!!");
    }else{
      throw new BadRequestError('input cannot be empty')
    }
  }
);

export { router as NewInvestment };
