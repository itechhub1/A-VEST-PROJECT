import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {renderFeild} from '../../components/inputFeild'



const Login = ({ handleSubmit }) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div className=" w-full    mx-4 md:max-w-md xl:max-w-xl bg-white  dark:bg-white dark:text-black  md:shadow">
      <div className="w-full ">
        <div className=" grid md:grid-cols-2 gap-4 bg-gray-100 relative">
          {window.innerWidth > 812 && (
            <div className=" flex flex-1   ">
              <img
                src={require("../../assets/cactus.jpg").default}
                alt=""
                className=" "
                style={{ maxHeight: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          <div className="w-full py-4 ">
            <div className="flex justify-center items-center ">
              <img
                src={require("../../assets/logo.jpeg").default}
                alt="aimart logo"
                className="w-20 h-20  object-contain"
              />
            </div>
            <h1 className="text-black font-semibold text-xl px-2">SignIn</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 sm:w-full ">
              <div className="sm:px-2">
                <Field
                  name="email"
                  component={renderFeild}
                  label="Email"
                  type="text"
                  placeholder="Email Address"
                />

                <Field
                  name="password"
                  component={renderFeild}
                  type="Password"
                  placeholder="Enter password"
                  label="Password"
                />
              </div>
              <div className="mx-2">
                <button className=" w-full mt-4  inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none">
                  Login
                </button>
              </div>
              <div className="flex justify-between items-center mx-2 mt-4">
                <p className="text-xs hover:underline hover:text-blue-700 text-gray-700 ">
                  Forget your password?
                </p>
                <p>OR</p>

                <Link
                  to="/register"
                  className="text-xs hover:underline hover:text-blue-700 text-gray-700 "
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const validate = ({ email, password }) => {
  const error = {};
  console.log(error);
  if (!email) {
    error.email = "email Feild Is Empty.";
  }

  if (!password) {
    error.password = "Password Feild Is Empty";
  }

  return error;
};
export default reduxForm({
  validate,
  form: "login",
})(Login);