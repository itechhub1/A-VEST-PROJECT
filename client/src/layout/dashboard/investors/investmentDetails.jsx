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
        <div className=" grid md:grid-cols-2 gap-2">
          <div className="">
            <h3 className="text-blue-800 text-xl font-semibold md:text-3xl pb-2">
              Personal Data
            </h3>
            <SingleDetails details={details} />
          </div>
          <div className="">
            <h6 className="text-blue-800 text-xl font-semibold md:text-3xl pb-2">
              Other information
            </h6>
            <OtherDetails details={details} />
          </div>{" "}
          {/* other info */}
        </div>
      </div>

      <div className="bg-gray-100 p-4 my-4">
        <h3 className="text-blue-800 text-xl font-semibold md:text-3xl pb-2">
          Investment Plan
        </h3>
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
        <h3 className="text-blue-800 text-xl font-semibold md:text-3xl pb-2 ">
          Others
        </h3>
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
