import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import UploadProgress from "../../../components/file/progressBar";

import { renderFeild } from "../../../components/inputFeild";
import { identification } from "../../../constant";
import { connect } from "react-redux";
import {
  setUploadFiles,
  CancelFileUpload,
  viewProfile,
  AddProfile,
} from "../../../action";

const renderOptionFeild = ({ input, meta }) => {
  //if (!data) return;
  return (
    <div className="">
      <p className="font-bold text-sm mt-2 ">Means of identifications</p>
      <select
        {...input}
        className=" px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
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

const Profile = (props) => {
  const {
    handleSubmit,
    setUploadFiles,
    CancelFileUpload,
    viewProfile,
    AddProfile,
    status,
    initialValues,
  } = props;
  console.log(props);

  const [completed, setcompleted] = useState(false);

  const submit = (formvalues) => {
    console.log(formvalues);
    AddProfile(formvalues);
  };

  useEffect(() => {
    viewProfile(() => null);
  }, []);

  const onChange = (e) => {
    setcompleted(true);
    console.log(e.target.files);
    setUploadFiles(e.target.files);
  };

  return (
    <div className=" w-full m-2 md:m-4">
      <h1 className="text-3xl font-semibold text-black dark:text-gray-200">
        Profile
      </h1>
      <h1 className=" text-xl md:text-2xl text-black mt-2 dark:text-gray-200">
        Edit / Complete your Profile
      </h1>

      <div className=" max-w-xl bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-2 p-2 md:p-4 border dark:border-gray-200">
        <div className="">
          <div className="my-2">
            <h1 className="text-lg font-semibold ">John Doe</h1>
            <p className="text-base">Doe@doe.com</p>
          </div>

          <form  onSubmit={handleSubmit(submit)}>
            <Field
              component={renderFeild}
              placeholder="e.g 0815555555"
              name="phonenumber"
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

            <Field component={renderOptionFeild} name="identity" />

            <div className="my-2">
              <span className=" leading-normal font-bold  mt-2 ">
                Attachment
              </span>
              <div className=" w-full  bg-grey-lighter ">
                <label className=" relative md:w-64 flex flex-col items-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
                  {status === 1 && (
                    <div
                      onClick={() => {
                        CancelFileUpload();
                        setcompleted(false);
                      }}
                      profile
                      className=" font-semibold absolute right-0 top-0 text-red-800 mr-2"
                    >
                      X
                    </div>
                  )}
                  <svg
                    className="w-8 h-8 mr-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span>{status === 1 ? "completed" : "select a file"}</span>
                  <div className=" w-full absolute bottom-0 ">
                    <UploadProgress />
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    onClick={(e) => ((completed || initialValues!==null )? e.preventDefault() : null)}
                    onChange={onChange}
                  />
                </label>
              </div>
            </div>

            {!initialValues && (
              <button
                type="submit"
                className="bg-blue-600 text-gray-200 rounded-lg p-2 mt-2"
              >
                Complete Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const validate = ({
  nationality,
  dob,
  relationship,
  phonenumber,
  identity,
}) => {
  const error = {};
  if (!nationality) error.nationality = "input your nationality";
  if (!dob) error.dob = "input your dob";

  if (!relationship) error.relationship = "input your relationship";
  if (!phonenumber) error.phonenumber = "input your phone number";
  if (!identity) error.identity = "select means of indentification";

  return error;
};

const mapStateToProps = (state, props) => {
  //const {phonenumber} = props?.profile

  return {
    status: state.fileProgress.file[1]?.status,
    initialValues: state?.profile
  };
};

export default connect(mapStateToProps, {
  setUploadFiles,
  CancelFileUpload,
  viewProfile,
  AddProfile,
})(
  reduxForm({
    form: "profile",
    validate,
  })(Profile)
);
