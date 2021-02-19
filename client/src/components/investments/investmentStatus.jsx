import React from "react";

const investmentsDetails = ({ details }) => {
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
    expiredTime,
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
    <div className=" inline-block   ">
      <div className=" inline-flex items-center mt-2 mr-2 ">
        <span className="mr-2">Payment Status</span>
        <p
          className={
            payment
              ? "bg-green border bg-green-100 border-green-800 text-green-800 rounded-md px-4"
              : "bg-yellow border bg-yellow-100 border-yellow-800 text-yellow-800 rounded-md px-4"
          }
        >
          {payment ? "Paid" : "Not Paid"}
        </p>
      </div>

      <div className=" inline-flex items-center mt-2 mr-2 ">
        <span className="mr-2">status</span>
        <p
          className={
            status === "1"
              ? "bg-yellow border bg-yellow-100 border-yellow-800 text-yellow-800 rounded-md px-4"
              : status === "2"
              ? "bg-red border bg-red-100 border-red-800 text-red-800 rounded-md px-4"
              : "bg-green border bg-green-100 border-green-800 text-green-800 rounded-md px-4"
          }
        >
          {status === "1"
            ? "Pending"
            : status === "2"
            ? "Cancelled"
            : "Active"}
        </p>
      </div>

      <div className=" inline-flex items-center mt-2 mr-2 ">
        <span className="mr-2">terminated</span>
        <p className={termination?'border bg-red-100 border-red-800 text-red-800 rounded-md px-4 ':'border bg-green-100 border-green-800 text-green-800 rounded-md px-4 '}>
          {termination?'Yes':'No'}
        </p>
      </div>
    </div>
  );
};

export default investmentsDetails;
