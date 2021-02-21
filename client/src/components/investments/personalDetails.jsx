import React from "react";
import { Link } from "react-router-dom";

const SingleDetails = ({ details, children }) => {
  const {
    email,
    fullname,

    phonenumber,
    identity,
  } = details;

  return (
    <div className=" ">
      <h2 className="pb-2 text-sm">
        {" "}
        <span className="text-base pr-4 font-medium">Name:</span> {fullname}
      </h2>

      <h5 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Phone Number:</span>
        {phonenumber}
      </h5>
      <h6 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Email Address:</span>{" "}
        {email}
      </h6>
      {children}
    </div>
  );
};

export default SingleDetails;
