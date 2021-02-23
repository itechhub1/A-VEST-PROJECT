import React from "react";
import { reduxForm, Field } from "redux-form";
import { renderFeild } from "../../../components/inputFeild";
import { updateCredentials } from "../../../action/auth/updateCredentials";
import { connect } from "react-redux";

const Settings = ({ handleSubmit, updateCredentials }) => {
  const submit = (inputValues) => {
    updateCredentials(inputValues);
  };

  return (
    <div className=" max-w-3xl w-full">
      <h1 className="font-semibold text-3xl dark:text-white">
        Update Password
      </h1>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          name="oldPassword"
          component={renderFeild}
          label="Enter old password"
          type="password"
        />
        <Field
          name="newPassword"
          component={renderFeild}
          label="Enter new password"
          type="password"
        />
        <Field
          name="repeatPassword"
          component={renderFeild}
          label="Repeat  new password"
          type="password"
        />
        <button
          className="bg-red-800 rounded-lg text-white py-2 px-8 mt-4 hover:bg-red-500 focus:outline-none"
         
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

const validate = ({ oldPassword, newPassword, repeatPassword }) => {
  const error = {};

  if (!oldPassword) {
    error.oldPassword = "old password feild cannot be is empty";
  }

  if (!newPassword) {
    error.newPassword = "new password feild cannot be empty";
  }

  if (!repeatPassword) {
    error.repeatPassword = "repeat password feild cannot be empty";
  }

  if (newPassword !== repeatPassword) {
    error.repeatPassword = "password does not match";
  }

  return error;
};

export default connect(
  null,
  {updateCredentials}
)(
  reduxForm({
    form: "updatePassword",
    validate,
  })(Settings)
);
