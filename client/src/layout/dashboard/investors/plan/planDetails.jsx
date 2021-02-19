import React, { useState, useEffect } from "react";
import { plans } from "../../../../constant";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { parse } from "query-string";
import { renderFeild } from "../../../../components/inputFeild";

/*  */

const PlanDetails = ({
  investData,
  handleSubmit,
  prevPage,
  nextPage,
  change,
}) => {
  const [invest, setinvest] = useState(null);

  const { id } = parse(window.location.search);
  const renderOptionFeild = ({ input, meta }) => {
    if (!id) return null;
    const data = plans.find((pl) => pl.id === parseInt(id));

    //if (!data) return;
    return (
      <div className="">
        <p className="font-bold text-sm mb-2 ml-1">Pick an investment plan</p>
        <select
           
          {...input}
          className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="" disabled>
            --- select a plan --
          </option>
          {data.duration.map((_) => {
            return (
              <option  value={_.data}>
                {_.data}
              </option>
            );
          })}
        </select>

        {meta.touched && meta.error ? (
          <div className=" text-xs text-red-600 italic ">{meta.error}</div>
        ) : (
          ""
        )}
      </div>
    );
  };


  /*manipulating investment data slsected by invexstor while prefil the redux-form */
  const getInvestmentDetails = () => {
    return plans.find(
      (inv) =>
        inv.id === parseInt(id) && (
          <div>
            {change("plan", inv.name)}
            {setinvest(inv)}
          </div>
        )
    );
  };

  const calculateROI = (investData) => {
    if (investData) {
      if(! investData.percentage)return
      const extractedPercentage = investData.percentage.split(" ")[0].split('%')[0]
     
      let percentROI =
        (extractedPercentage / 100) * parseInt(investData.amount);
      percentROI = percentROI + parseInt(investData.amount);
      if (isNaN(percentROI)) return;
      return change(
        "roi",
        percentROI
      );
    }
  };

  useEffect(() => {
    getInvestmentDetails();
  }, [id]);
  useEffect(() => {
    calculateROI(investData);
  }, [investData]);

  const submit = (formValues) => {
    console.log("amount", formValues.amount);
    const inrange =
      formValues.amount >= parseInt(invest.min) &&
      formValues.amount <= parseInt(invest.max);
    if (!inrange) {
      throw new SubmissionError({
        amount: "invalid price range:kindly check amount range",
      });
    }

    nextPage();
  };

  return (
    <div className=" max-w-3xl w-full">
      <div>
        <h1 className="text-3xl font-semibold text-black dark:text-gray-200">
          Plan Details
        </h1>
        <p className=" text-red-800 text-base italic">
          Please do not refresh this page
        </p>

        <p className="text-gray-800 text-base">step 1/4</p>

        <div className="my-4 ">
          <form onSubmit={handleSubmit(submit)}>
            <Field
              component={renderFeild}
              disable={true}
              name="plan"
              label="Plan Selected"
            />
            <Field
              component={renderOptionFeild}
            
              name="percentage"
              label="Duration"
            />{" "}
            <Field
              component={renderFeild}
              name="amount"
              label="Amount to invest"
            />
            {invest && invest && (
              <p className="text-xs text-gray-800 mb-2">{`minimum investment is  ₦${invest.min
                .toString()
                .replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )} maximum amount is  ₦${invest.max
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            )}
            <Field
              component={renderFeild}
              disable={true}
              name="roi"
              label="Your total ROI"
            />
            <div className="flex items-center mt-4">
              <button
                className="bg-blue-800 text-white p-2 px-8 inline-flex rounded-lg"
                onClick={prevPage}
              >
                <svg
                  className="w-6 h-6 "
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Prev
              </button>

              <button
                className="bg-blue-800 text-white p-2 px-8 inline-flex ml-2 rounded-lg"
                onSubmit="submit"
              >
                Next
                <svg
                  class="w-6 h-6"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const validate = ({ amount, percentage }) => {
  const error = {};

  if (!amount) {
    error.amount = "amount feild cannot be empty.";
  }
  if (!percentage) {
    error.percentage = "select plan feild cannot be empty";
  }

  return error;
};
const mapStateToProps = (state) => {
  let investData = state.form.investmentForm?.values;
  return { investData };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "investmentForm",
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(PlanDetails)
);
