import React from "react";

const InvestemntPlan = ({ details, children }) => {
  const {
    amount,

    expireTime,

    plan,

    roi,

    percentage,
  } = details;

  return (
    <div className=" ">
      <h2 className="pb-2 text-sm">
        {" "}
        <span className="text-base pr-4 font-medium">Plan:</span> {plan} (
        {percentage})
      </h2>
      <h6 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Amount:</span> ₦
        {amount.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
      </h6>

      <h4 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">Expiry Time:</span>
        {expireTime}
      </h4>
      <h5 className="pb-2 text-sm">
        {" "}
        <span className="tex-base pr-4 font-medium">ROI:</span>₦
        {roi.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
      </h5>

      {children}
    </div>
  );
};

export default InvestemntPlan;
