import React from "react";

const EmployersDetails = ({ details, children }) => {
  const { employerCompany, occupationDesc } = details;

  return (
    <div className=" ">
      <h2 className="pb-2 text-sm">
        {" "}
        <span className="text-base pr-4 font-medium">
          Employer Company:
        </span>{" "}
        {employerCompany}
      </h2>

      <h4 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">
          Occupation Description:
        </span>
        <p>{occupationDesc}</p>
      </h4>
    </div>
  );
};

export default EmployersDetails;
