import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderFeild } from "../../../../components/inputFeild";
import { identification } from "../../../../constant";
import liphonenumber from "libphonenumber-js";

const renderOptionFeild = ({ input, meta }) => {
  //if (!data) return;
  return (
    <div className="">
      <p className="font-bold text-sm mb-2 ml-1">Means of identifications</p>
      <select
        {...input}
        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
      >
        <option value="" disabled>
          --- select means of identification --
        </option>
        {identification.map((_) => (
          <option value={_}>{_}</option>
        ))}
      </select>

      {meta.touched && meta.error ? (
        <div className=" text-xs text-red-600 italic ">{meta.error}</div>
      ) : (
        ""
      )}
    </div>
  );
};

const personalInformation = ({ nextPage, prevPage, handleSubmit }) => {
  const onNext = () => nextPage();

  return (
    <div className=" max-w-3xl w-full">
      <h1 className="text-3xl font-semibold">Personal information</h1>
      <p className=" text-red-800 text-base italic">
        Please do not refresh this page
      </p>

      <p className="text-gray-800 text-base">step 2/4</p>

      <form onSubmit={handleSubmit(onNext)} className="my-4">
        <Field component={renderFeild} name="fullname" label="Full name" />

        <Field component={renderFeild} name="email" label="Email address" />

        <Field
          component={renderFeild}
          name="phonenumber"
          label="phone number"
        />

        <Field component={renderOptionFeild} name="identity" />

        <div className="flex items-center mt-2">
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
  );
};

const validate = ({ identity, phonenumber }) => {
  let isPhoneNumber
 if ( typeof phonenumber === 'string') {
     isPhoneNumber = liphonenumber(phonenumber, "NG");
 
 }

  const error = {};
  if (!identity) {
    error.identity = "means of identification cannot be empty";
  }

  if (isPhoneNumber=== undefined || !isPhoneNumber.isValid()) {
    (error.phonenumber = "input must be a valid phone number"); 
  } 
  return error;
};

export default reduxForm({
  form: "investmentForm",
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(personalInformation);
