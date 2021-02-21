import React from "react";
import { Link } from "react-router-dom";

/* 
  
  status(pin):"1"
payment(pin):false
termination(pin):false
investementExpired(pin):false
_id(pin):"6022b9ba566d8be94d012414"
addressOfKin(pin):"KPK 9000"
agreement(pin):true
amount(pin):1000000
email(pin):"tohshine@gmail.com"
fullname(pin):"Owoeye Oluwatosin Ajibola"
expireTime(pin):"Mon Aug 09 2021 17:35:06 GMT+0100"
relationshipOfKin(pin):"Married"
paymentPlan(pin):"paystack"
phonenumber(pin):"8060516515"
plan(pin):"Gold Basic"
identity(pin):"International Passport"
userId(pin):"60226dba4ebd7d81044f79c0"
employerCompany(pin):"eee"
occupationDesc(pin):"eeee"
phonenumberOfKin(pin):"080336467585"
roi(pin):1100000
nextOfKin(pin):"Akin"
percentage(pin):"10% 6months"
createdAt(pin):"2021-02-09T16:35:06.847Z"
  
  */

const InvestemntPlan = ({ details, children }) => {
  const {
    status,
    payment,
    termination,
    investmentExpired,
    addressOfKin,
    agreement,
    amount,
    email,
    fullname,
    expireTime,
    relationshipOfKin,
    paymentPlan,
    phonenumber,
    plan,
    identity,
    employerComapny,
    occupationDesc,

    roi,
    nextOfKin,
    percentage,
  } = details;

  return (
    <div className=" ">
      <h2 className="pb-2 text-sm">
        {" "}
        <span className="text-base pr-4 font-medium">Plan:</span> {plan}{' '}({percentage})
      </h2>
      <h6 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Ammount:</span>{" "}
        ₦{amount.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
      </h6>

      <h4 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Expiry Time:</span>
        {expireTime}
      </h4>
      <h5 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">ROI:</span>
         ₦{roi.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
      </h5>
      
      {children}
    </div>
  );
};

export default InvestemntPlan;
