import React from "react";
import { renderFeild } from "../../../../components/inputFeild";
import { reduxForm, Field } from "redux-form";

const employerDetails = ({ nextPage, prevPage, handleSubmit }) => {
  const submit = () => {
    nextPage();
  };

  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-3xl font-semibold text-black dark:text-white">
        Employer's Details
      </h1>
      <p className=" text-red-800 text-base italic">
        Please do not refresh this page
      </p>
      <p className="text-gray-800 dark:text-white text-base">step 3/4</p>

      <div className="mt-4 ">
        <form onSubmit={handleSubmit(submit)}>
          <Field
            name="employerCompany"
            component={renderFeild}
            label="Name of employer company"
            type="text"
            placeholder="Enter your employer company"
          />
          <Field
            name="occupationDesc"
            component={renderFeild}
            label="Description of occupation"
            type="text"
            placeholder="Enter occupation descriptions"
          />
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

const validate = ({occupationDesc,employerCompany}) => {
 const error = {}
if(!occupationDesc) error.occupationDesc = 'occupation description cannot be empty'
if(!employerCompany) error.employerCompany = 'employer company name  cannot be empty'

 return error

};

export default reduxForm({
  form: "investmentForm",
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(employerDetails);
