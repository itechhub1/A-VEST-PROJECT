import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

import ModalMssg from "../../../../components/modal";
import Modal from "../../../../components/portal/Modal";
import { ViewAdminInvestment } from "../../../../action/administrator/investment/view";
import { viewInvestorProfile } from "../../../../action/administrator/investment/fetchInvestorsProfile";
import { AuthorizeBankTransfer } from "../../../../action/administrator/investment/bankTransferUpdate";
import { ResolvedInvestment } from "../../../../action/administrator/investment/resolveInvestment";

import InvestmentStatus from "../../../../components/investments/investmentStatus";

import SingleDetails from "../../../../components/investments/personalDetails";
import OtherDetails from "../../../../components/investments/otherDetails";
import InvestmentPlans from "../../../../components/investments/investmentPlan";
import EmployersDetails from "../../../../components/investments/employerDetails";

const InvestmentDetails = ({
  details,
  profile,
  ViewAdminInvestment,
  viewInvestorProfile,
  AuthorizeBankTransfer,
  ResolvedInvestment,
}) => {
  const { detailsId } = useParams();
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    ViewAdminInvestment(detailsId, () => null);
  }, []);

  if (details === null) return <div className="">Loading....</div>;

  return (
    <div className="w-full bg-white">
      <div className="flex justify-between flex-shrink items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-semibold  text-black">Details</h1>

          <Button
            disabled={
              details.status === "0"
                ? true
                : details.status === "2"
                ? true
                : false
            }
            onClick={() => {
              const box = window.confirm("Are you sure!!!!");
              if (box === true) {
                AuthorizeBankTransfer(details._id, () => {
                  ViewAdminInvestment(detailsId, () => null);
                });
              } else {
              }
            }}
            variant="contained"
            color="primary"
            size="small"
          >
            Authorize payment
          </Button>
        </div>
        {/* click has attended */}
        <Button
           disabled={details.cleared}
          onClick={() => setopen(true)}
          variant="contained"
          size="medium"
          color="secondary"
          style={{ fontSize: "10px" }}
        >
          <span className="text-sm "> Mark as resolved</span>
        </Button>
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
        <div className=" grid grid-cols-2 gap-2">
          <div className="">
            <h3 className="text-blue-800 text-xl font-semibold md:text-3xl pb-2">
              Investment Plan
            </h3>
            {/* investment plan */}

            <InvestmentPlans details={details} />
            <p className="font-semibold text-sm text-yellow-800">
              Investement Health
            </p>

            {/* investment Details */}
            <InvestmentStatus details={details} />
          </div>

          <div className="">
            <h1 className="text-blue-800 text-xl font-semibold md:text-3xl pb-2">
              Profile
            </h1>
            <Button
              disabled={loading}
              onClick={() => {
                setloading(true);
                viewInvestorProfile(details.userId, () => setloading(false));
              }}
              color="primary"
              size="medium"
              variant="contained"
              style={{ fontSize: "12px" }}
            >
              More info
            </Button>

            {loading ? (
              <p>Fetching Profile</p>
            ) : !loading && profile !== null ? (
              <div className="mt-2 space-y-2">
                <div className="">
                  Relationship: <span>{profile.relationship}</span>
                </div>
                <div className="">
                  DOB: <span>{profile.dob}</span>
                </div>
                <div className="">
                  Nationality: <span>{profile.nationality}</span>
                </div>
                <div className="">
                  Document: <span>{profile.identity}</span>
                </div>
                <div className="">
                  <a
                    href={`https://aimartavest.s3.us-east-2.amazonaws.com/${profile.attachment}`}
                    className="bg-red-800 p-2 px-8 rounded-md text-white"
                  >
                    Download attachment
                  </a>
                </div>
              </div>
            ) : (
              <p>User have not completed profile</p>
            )}
          </div>
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
      {open && (
        <Modal>
          <ModalMssg
            action={() => {
              ResolvedInvestment(detailsId,()=> ViewAdminInvestment(detailsId, () => null));
              setopen(false);
            }}
            cancel={() => setopen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.investmentDetails,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  ViewAdminInvestment,
  viewInvestorProfile,
  AuthorizeBankTransfer,
  ResolvedInvestment,
})(InvestmentDetails);
