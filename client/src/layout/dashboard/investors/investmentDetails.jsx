import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { ViewInvestment } from "../../../action/investments/view";
import InvestmentStatus from "../../../components/investments/investmentStatus";

import SingleDetails from "../../../components/investments/personalDetails";
import OtherDetails from "../../../components/investments/otherDetails";
import InvestmentPlans from "../../../components/investments/investmentPlan";
import EmployersDetails from "../../../components/investments/employerDetails";

const InvestmentDetails = ({ details, ViewInvestment }) => {
  const { detailsId } = useParams();
  console.log("myDetails", details);

  useEffect(() => {
    ViewInvestment(detailsId, () => null);
  }, []);

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
  if (details === null) return <div className="">Loading....</div>;

  return (
    <div className="w-full bg-white">
      <div className="flex flex-shrink items-center">
        <h1 className="text-3xl font-semibold  text-black">Details</h1>
        <p
          className={
            details.status === "1"
              ? "bg-yellow border bg-yellow-100 border-yellow-800 text-yellow-800 rounded-md px-4 ml-2"
              : details.status === "2"
              ? "bg-red border bg-red-100 border-red-800 text-red-800 rounded-md px-4 ml-2"
              : "bg-green border bg-green-100 border-green-800 text-green-800 rounded-md px-4 ml-2"
          }
        >
          {details.status === "1"
            ? "Pending"
            : details.status === "2"
            ? "Cancelled"
            : "Active"}
        </p>
      </div>
      <div className="bg-gray-100 p-4 my-4">
        <div className="grid  grid-cols-2 gap-2">
          <h3 className="text-blue-800  text-3xl pb-2">Personal Data</h3>
          <h6 className="text-blue-800  text-3xl pb-2">Other information</h6>
        </div>
        <div className=" grid grid-cols-2 gap-2">
          <SingleDetails details={details} />
          {/* other info */}
          <OtherDetails details={details} />
        </div>
      </div>

      <div className="bg-gray-100 p-4 my-4">
        <h3 className="text-blue-800  text-3xl pb-2">Investment Plan</h3>
        <div className=" grid-cols-1">
          <div className="">
            {/* investment plan */}

            <InvestmentPlans details={details} />
            <p className="font-semibold text-sm text-yellow-800">
              Investement Health
            </p>

            {/* investment Details */}
            <InvestmentStatus details={details} />
          </div>

          <div className=""></div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 my-4">
        <h3 className="text-blue-800 text-3xl pb-2">Others</h3>
        <div className=" grid-cols-1">
          {/* employers details */}

          <EmployersDetails details={details} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.investmentDetails,
  };
};

export default connect(mapStateToProps, { ViewInvestment })(InvestmentDetails);
