import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { renderFeild } from "../../components/inputFeild";
import { signInUser } from "../../action";
import { connect } from "react-redux";

const Login = ({ handleSubmit, signInUser }) => {
  const [loading, setloading] = useState(false);

  const onSubmit = (formValues) => {
    setloading(true);
    signInUser(formValues, () => setloading(false));
  };

  return (
    <div className=" w-full      md:max-w-3xl xl:max-w-4xl   md:shadow">
      <div className="w-full ">
        <div className="grid md:grid-cols-2  shadow-xl ">
          {window.innerWidth > 812 && (
            <img
              src={require("../../assets/avestlogo.jpeg").default}
              alt=""
              className=" "
              style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }}
            />
          )}
          <div className=" flex flex-col justify-between items-center w-full py-4 px-4 ">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 sm:w-full ">
              <div className="">
                <h1 className=" font-semibold text-xl md:text-3xl ">SignIn</h1>
                <div className=" ">
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
                  <button
                    onClick={(e) => (loading ? e.preventDefault() : null)}
                    className=" w-full mt-4  inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
                  >
                    {loading ? "please wait..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
            <div className="flex justify-between items-center  space-x-4">
              <p className="text-xs hover:underline font-bold hover:text-blue-700 text-gray-700 ">
                Forget your password?
              </p>
              <p>OR</p>

              <Link
                to="/register"
                className="text-xs hover:underline font-bold hover:text-blue-700 text-gray-700 "
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const validate = ({ email, password }) => {
  const error = {};
  if (!email) {
    error.email = "email Feild Is Empty.";
  }

  if (!password) {
    error.password = "Password Feild Is Empty";
  }

  return error;
};
export default connect(null, { signInUser })(
  reduxForm({
    validate,
    form: "login",
  })(Login)
);
