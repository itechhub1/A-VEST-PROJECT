import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderFeild } from "../../../components/inputFeild";

const Profile = ({ handleSubmit }) => {
  const submit = (formvalues) => {
    alert(formvalues);
  };

  return (
    <div className=" w-full m-2 md:m-4">
      <h1 className="text-3xl font-semibold text-black dark:text-gray-200">
        Profile
      </h1>
      <h1 className=" text-xl md:text-2xl text-black mt-2 dark:text-gray-200">
        Edit / Complete your Profile
      </h1>

      <div className="  max-w-2xl bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-2 p-2 md:p-4 border dark:border-gray-200">
        <div className=" w-full">
          <div className="my-2">
            <h1 className="text-lg font-semibold ">John Doe</h1>
            <p className="text-base">Doe@doe.com</p>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <Field
              component={renderFeild}
              placeholder="e.g 0815555555"
              name="phoneNumber"
              type="text"
              label="Phone number"
            />
            <Field
              component={renderFeild}
              placeholder="e.g single"
              name="relationship"
              type="text"
              label="marital status"
            />
            <Field
              component={renderFeild}
              placeholder="e.g 01/01/1900"
              name="dob"
              type="date"
              label="Date of birth"
            />
            <Field
              component={renderFeild}
              placeholder="e.g Nigerian"
              name="nationality"
              type="text"
              label="Nationality"
            />

            <button
              type="submit"
              className="bg-blue-600 text-gray-200 rounded-lg p-2 mt-2"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const validate = ({ nationality, dob, relationship, phoneNumber }) => {
  const error = {};
  if (!nationality) error.nationality = "input your nationality";
  if (!dob) error.dob = "input your dob";

  if (!relationship) error.relationship = "input your relationship";
  if (!phoneNumber) error.phoneNumber = "input your phone number";

  return error;
};

export default reduxForm({ form: "profile", validate })(Profile);
