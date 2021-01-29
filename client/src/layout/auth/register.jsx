import React from "react";
import {Link} from 'react-router-dom'

const Registration = () => {
  return (
    <div className=" w-full    mx-4 md:max-w-2xl xl:max-w-2xl bg-white dark:bg-transparent dark:text-black md:border">
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
          <div className="w-full py-4  ">
            <div className="flex justify-center items-center ">
              <img
                src={require("../../assets/logo.jpeg").default}
                alt="aimart logo"
                className="w-20 h-20  object-contain"
              />
            </div>
            <h1 className="text-black font-semibold text-xl px-2">SignUp</h1>
            <form action="" className="mt-4 sm:w-full ">
              <div className="sm:px-2">
                <div className=" flex justify-between items-center">
                  <div>
                    <label className="font-bold text-sm mb-2 ml-1">
                      Firstname
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="e.g John"
                      type="text"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-sm mb-2 ml-1">
                      Lastname
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="e.g Doe"
                      type="text"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-sm mb-2 ml-1">Email</label>
                  <div>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Active Email"
                      type="password"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-sm mb-2 ml-1">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Password"
                    type="password"
                  />
                </div>

                <div>
                  <label className="font-bold text-sm mb-2 ml-1">
                    Repeat Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Repeat Password"
                    type="password"
                  />
                </div>
              </div>
              <div className="mx-2 mb-4">
                <button className=" w-full mt-4  inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none">
                  Register
                </button>
              </div>
              <button className="text-xs hover:underline hover:text-blue-700 text-gray-700 text-center">
              <Link to="/" >
                Click here to login
              </Link>
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
