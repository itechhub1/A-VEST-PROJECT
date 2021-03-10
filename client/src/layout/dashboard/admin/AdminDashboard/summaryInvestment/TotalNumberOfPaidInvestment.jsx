import React from "react";
import { PaidInvestment } from "../../../../../action/administrator/investment";
import InvestmetTable from "../../../../../components/investments/investmentTable";
const TotalNumberOfPaidInvestment = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-3xl mb-4">Paid Investment</h1>
      <InvestmetTable api={PaidInvestment} />
    </div>
  );
};

export default TotalNumberOfPaidInvestment;
