import React from "react";

const OtherSingleDetails = ({ details, children }) => {
  const {
    addressOfKin,

    relationshipOfKin,

    nextOfKin,
  } = details;

  return (
    <div className=" ">
      <h2 className="pb-2 text-sm">
        {" "}
        <span className="text-base pr-4 font-medium">Name Of kin:</span>{" "}
        {nextOfKin}
      </h2>

      <h4 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Address Of Kin:</span>
        {addressOfKin}
      </h4>
      <h5 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Relationship Of Kin:</span>
        {relationshipOfKin}
      </h5>

      {children}
    </div>
  );
};

export default OtherSingleDetails;
