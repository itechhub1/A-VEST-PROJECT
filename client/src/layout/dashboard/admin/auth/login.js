import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { renderFeild } from "../../../../components/inputFeild";
import { AdminLogin } from "../../../../action/administrator/auth/signin";
import { connect } from "react-redux";

const AdminAuthLogin = ({ handleSubmit, AdminLogin }) => {
    const [loading, setloading] = useState(false);

    const onSubmit = (formValues) => {
        setloading(true);
        AdminLogin(formValues, () => setloading(false));
    };

    return (
        <div className=" w-full    mx-4 md:max-w-sm xl:max-w-md bg-white  dark:bg-white dark:text-black  md:shadow">
            <div className="w-full ">
                <div className=" grid md:grid-cols-1  bg-gray-100 relative shadow-md">

                    <div className="w-full py-4 ">
                        <div className="flex justify-center items-center ">
                            <img
                                src={require("../../../../assets/logo.jpeg").default}
                                alt="aimart logo"
                                className="w-20 h-20  object-contain"
                            />
                        </div>
                        <h1 className="text-black font-semibold text-xl px-2 text-center">Admin SignIn</h1>
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
                                    name="username"
                                    component={renderFeild}
                                    label="Username"
                                    type="text"
                                    placeholder="Username"
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
                                <button
                                    onClick={(e) => (loading ? e.preventDefault() : null)}
                                    className=" w-full mt-4  inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
                                >
                                    {loading ? "please wait..." : "Login"}
                                </button>
                            </div>
                            <div className="flex justify-between items-center mx-2 mt-4">


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const validate = ({ email, password,username }) => {
    const error = {};
    console.log(error);
    if (!email) {
        error.email = "email Feild Is Empty.";
    }

    if (!password) {
        error.password = "Password Feild Is Empty";
    }
    if (!username) {
        error.username = "username Feild Is Empty";
    }

    return error;
};
export default connect(null, { AdminLogin })(
    reduxForm({
        validate,
        form: "adminLogin",
    })(AdminAuthLogin)
);
