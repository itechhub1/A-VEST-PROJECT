import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { renderFeild } from "./../../../../components/inputFeild";
import { connect } from "react-redux";
import {Button} from '@material-ui/core'

import { NewInvestment } from "../../../../action/investments";

const PaymentInfo = ({ prevPage, nexPage, handleSubmit,NewInvestment }) => {
  const [loading, setloading] = useState(false);
  
  const renderPayment = ({ input, meta }) => {
    return (
      <div className="mt-4">
        <div className="flex items-center mb-4">
          <p>Select a payment plan</p>{" "}
          <img
            src={require("../../../../assets/paystack.png").default}
            alt="aimart invest paystack picture"
            className=" ml-2 w-32"
          />
        </div>
        <select
          className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
          {...input}
        >
          <option value="" disabled>
            --- select payment type ---
          </option>
          <option value="paystack">Paystack</option>
          <option value="bank deposit">Bank payment</option>
        </select>
        {meta.touched && meta.error ? (
          <div className=" text-xs text-red-600 italic ">{meta.error}</div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const submit = (formInput) => {
    
    setloading(true);
    NewInvestment(formInput, () => setloading(false));
  };

  return (
    <div className="w-full max-w-3xl">
      <h1 className=" font-semibold text-3xl"> Payment Information</h1>

      <p className=" text-red-800 text-base italic">
        Please do not refresh this page
      </p>

      <p className="text-gray-800 text-base">Final Step</p>
      
      <form >
        <Field
          name="amount"
          component={renderFeild}
          disable="true"
          label="Amount used for investment" 
        />
          
        <Field name="paymentPlan" component={renderPayment} />
        <div className="flex items-center mt-2">
          <Button
            color="primary" variant="contained"
            onClick={prevPage} 
            style={{marginRight:"4px"}}
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
          </Button>
          <Button disabled={loading} color="secondary" variant="contained" onClick={handleSubmit(submit)}>
            <span>Submit form</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

const validate = ({ paymentPlan }) => {
  const error = {};
  if (!paymentPlan) {
    error.paymentPlan = "select a payment plan";
  }
  return error;
};

export default connect(
  null,
  {NewInvestment}
)(
  reduxForm({
    form: "investmentForm",
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(PaymentInfo)
);
