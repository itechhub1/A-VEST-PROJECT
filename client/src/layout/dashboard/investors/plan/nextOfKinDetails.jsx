import React from "react";
import { renderFeild } from "../../../../components/inputFeild";
import { reduxForm, Field } from "redux-form";

const renderCheckbox = ({ input, meta }) => {
  return (
    <div className="">
      <label className="inline-flex mt-3 items-center">
        <input
          {...input}
          type="checkbox"
          className=" sm:h-7 sm:w-7 text-blue-800"
        />
        <span className="text-xs text-gray-800 ml-4 leading-loose tracking-wide">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
          alias ex, unde incidunt maxime a beatae? Delectus repudiandae eligendi
          sunt minima quam eveniet fuga laborum ipsam quo! Blanditiis, quam vel.
        </span>
      </label>
      {meta.touched && meta.error ? (
        <div className=" text-xs text-red-600 italic ">{meta.error}</div>
      ) : (
        ""
      )}
    </div>
  );
};
const NextOfKinDetails = ({ nextPage, prevPage, handleSubmit }) => {
  const submit = () => {
    nextPage();
  };

  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-3xl font-semibold text-black dark:text-gray-200">
        Next Of Kin Details
      </h1>
      <p className=" text-red-800 text-base italic">
        Please do not refresh this page
      </p>
      <p className="text-gray-800 text-base">step 4/4</p>

      <div className="mt-4 ">
        <form onSubmit={handleSubmit(submit)}>
          <Field
            name="nameOfKin"
            component={renderFeild}
            label="Name of next of kin"
            type="text"
            placeholder="Enter next of kin name"
          />
          <Field
            name="addressOfKin"
            component={renderFeild}
            label="Next of kin address"
            type="text"
            placeholder="Enter next of kin address"
          />
          <Field
            name="phonenumberOfKin"
            component={renderFeild}
            label="Next of kin phone number"
            type="text"
            placeholder="Enter next of kin phone number"
          />
          <Field
            name="relationshipOfKin"
            component={renderFeild}
            label="Relationship"
            type="text"
            placeholder="Enter next of relationship"
          />

          <Field name="agreement" component={renderCheckbox} />

          <div className="flex items-center  mt-4">
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
  );
};

const validate = ({ name, address, phoneNumber, relationship, agreement }) => {
  const error = {};
  if (!name) error.name = "name cannot be empty";
  if (!address) error.address = "address company name  cannot be empty";
  if (!phoneNumber) {
    error.phoneNumber = "phone number   cannot be empty";
  }
  if (!relationship) {
    error.relationship = "relationship  cannot be empty";
  }

  if (!agreement) {
    error.agreement = "Accept terms and condition";
  }
  return error;
};

export default reduxForm({
  form: "investmentForm",
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(NextOfKinDetails);
