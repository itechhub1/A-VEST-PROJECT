import React from "react";
import { ExpiredInvestment } from "../../../../../action/administrator/investment";
import InvestmetTable from "../../../../../components/investments/investmentTable";
const TotalNumberOfExpiredInvestment = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-3xl mb-4">Expired Investment</h1>
      <InvestmetTable api={ExpiredInvestment} />
    </div>
  );
};

export default TotalNumberOfExpiredInvestment;
