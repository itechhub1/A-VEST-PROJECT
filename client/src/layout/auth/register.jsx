import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, makeStyles } from "@material-ui/core";
import { renderFeild } from "../../components/inputFeild";
import { registerUser } from "../../action";

const useStyle = makeStyles({
  root: {
    backgroundColor: "blue",
    width: "100%",
    marginTop: "8px",
  },

  label: {
    textTransform: "capitalize",
  },
});

const Registration = ({ registerUser, handleSubmit }) => {
  const [loading, setloading] = useState(false);
  const classes = useStyle();

  const onSubmit = ({ email, firstname, lastname, password }) => {
    setloading(true);
    registerUser({ email, firstname, lastname, password }, () =>
      setloading(false)
    );
  };

  return (
    <div className=" w-full     md:max-w-3xl xl:max-w-4xl md:border">
      <div className="w-full ">
        <div className=" grid md:grid-cols-2  shadow-xl ">
          {window.innerWidth > 812 && (
            <div className=" flex flex-1   ">
              <img
                src={require("../../assets/avestlogo.jpeg").default}
                alt=""
                className=" "
                style={{ maxHeight: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          <div className="w-full py-4 px-4">
            <h1 className="text-black font-semibold text-xl md:text-3xl ">SignUp</h1>
            <form className="mt-4 sm:w-full ">
              <div className="">
                <div className=" flex justify-between items-center">
                  <Field
                    label="First name"
                    component={renderFeild}
                    name="firstname"
                    type="text"
                  />
                  <Field
                    label="Last name"
                    component={renderFeild}
                    name="lastname"
                    type="text"
                  />
                </div>
                <Field
                  label="Email"
                  component={renderFeild}
                  name="email"
                  type="email"
                />

                <Field
                  label="Password"
                  component={renderFeild}
                  name="password"
                  type="password"
                />

                <Field
                  label="Repeat password"
                  component={renderFeild}
                  name="password2"
                  type="password"
                />
              </div>
              <div className=" mb-4">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  color="primary"
                  variant="contained"
                  className={classes.root}
                >
                  <span className={classes.label}> Register</span>
                </Button>
              </div>
              <button className="text-xs font-bold hover:underline hover:text-blue-700 text-gray-700 text-center">
                <Link to="/">Click here to login</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const validate = ({ firstname, lastname, email, password, password2 }) => {
  const error = {};
  if (!firstname) error.firstname = "input empty";
  if (!lastname) error.lastname = "input empty";
  if (!email) error.email = "Email input cannot be empty";
  if (!password) error.password = "Password input cannot be empty";
  if (!password2) error.password2 = "Repeat password input cannot be empty";

  if (password !== password2) error.password2 = "Password does not match";

  return error;
};

export default connect(null, { registerUser })(
  reduxForm({
    form: "registerationForm",
    validate,
  })(Registration)
);
