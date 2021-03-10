import React from "react";
import { IndexInvestment } from "../../../../action/administrator/investment/index";
import InvestmentTable from "../../../../components/investments/investmentTable";

const investment = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-3xl mb-4">Investments</h1>
      <InvestmentTable api={IndexInvestment} />
    </div>
  );
};

export default investment;
