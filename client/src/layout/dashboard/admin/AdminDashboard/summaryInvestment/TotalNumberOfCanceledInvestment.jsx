import React from "react";
import { CancelInvestment } from "../../../../../action/administrator/investment";
import InvestmetTable from "../../../../../components/investments/investmentTable";
const TotalNumberOfCancelInvestment = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-3xl mb-4">Terminated Investment</h1>
      <InvestmetTable api={CancelInvestment} />
    </div>
  );
};

export default TotalNumberOfCancelInvestment;
