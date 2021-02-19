import React from "react";
import { Link } from "react-router-dom";
import { plans } from "../../../../constant";

const Plans = ({nextPage}) => {
  const renderPlans = () => {
    return plans.map((plan) => (
      <div className="w-full p-4 md:w-1/2 lg:w-1/4 plan-card">
        <label className="flex flex-col rounded-lg shadow-lg group relative cursor-pointer hover:shadow-2xl">
          <div
            className={`w-full px-4 py-6 rounded-t-lg card-section-1 ${
              plan.name === "Platinum Executive" && "bg-blue-800 "
            }`}
          >
            <h3
              className={`mx-auto text-base font-semibold text-center underline group-hover:text-white ${
                plan.name === "Platinum Executive"
                  ? "text-white "
                  : "text-blue-800 "
              }`}
            >
              {plan.name}
            </h3>
            <p
              className={` mt-2 text-5xl font-bold text-center group-hover:text-white ${
                plan.name === "Platinum Executive"
                  ? "text-white "
                  : "text-blue-800 "
              }`}
            >
              {plan.duration[0].data}
            </p>
            <p
              className={` mt-2 text-base text-center uppercase group-hover:text-white ${
                plan.name === "Platinum Executive" ? "text-white " : "text-blue-800"
              }`}
            >
              ₦{plan.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Min 
            </p>
            <p
              className={` mt-2 text-base text-center uppercase group-hover:text-white ${
                plan.name === "Platinum Executive" ? "text-white " : "text-blue-800"
              }`}
            >
              ₦{plan.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Max
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full py-6 rounded-b-lg bg-blue-800">
            <p className="text-xl text-white">{plan.duration[0].data}</p>
            <Link
              to={`?id=${plan.id}`}
              onClick={nextPage}
              className="w-5/6 py-2 mt-2 font-semibold text-center uppercase bg-white border border-transparent rounded text-blue-800"
            >
              Invest Here
            </Link>
          </div>
        </label>
      </div>
    ));
  };

  return (
    <>
      <div className="container flex flex-wrap pt-4 pb-10 m-auto mt-6 md:mt-15 lg:px-12 xl:px-16">
        <div className="w-full px-0 lg:px-4">
          <h2 className="px-12 text-base font-bold text-center md:text-2xl text-blue-800 dark:text-gray-200">
            Choose your investment plan
          </h2>
          <p className="py-1 text-sm text-center text-blue-800 dark:text-gray-200 mb-10">
            Kindly click an investment plan to continue.
          </p>
          <div className="flex flex-wrap items-center justify-center py-4 pt-0">
            {renderPlans()} 
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
