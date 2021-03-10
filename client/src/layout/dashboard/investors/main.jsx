import React, { useState, useEffect } from "react";

import Card from "../../../components/card";
import { connect } from "react-redux";
import { allInvestment } from "../../../action/investments/allInvestment";

const Main = ({ firstname, investments, allInvestment }) => {
  const [isDark, setisDark] = useState(false);
  const darkMode = () => {
    let htmlClass = document.querySelector("html").classList;

    if (localStorage.theme === "dark") {
      htmlClass.remove("dark");
      localStorage.removeItem("theme");
      setisDark(false);
    } else {
      setisDark(true);
      htmlClass.add("dark");
      localStorage.theme = "dark";
    }
  };

  useEffect(() => {
    allInvestment();
  }, []);

  const renderNumberOfInvestment = () => {
    return investments.length;
  };

  const renderNumberOfExpiredInvestment = () => {
    const expiredInvestment = investments.filter((inv) => {
      return inv.expiredInvestment;
    });

    return expiredInvestment.length;
  };

  const renderNUmberOfExpiredAndPaid = () => {
    const expiredInvestment = investments.filter((inv) => {
      return inv.expiredInvestment && inv.cleared;
    });
    return expiredInvestment.length;
  };

  const renderNUmberOfTerminatedAndPaid = () => {
    const expiredInvestment = investments.filter((inv) => {
      return inv.terminated && inv.cleared;
    });
    return expiredInvestment.length;
  };

  return (
    <>
      <div className=" flex flex-col">
        <div className=" flex justify-between items-center">
          <div className="">
            <span className="text-3xl font-semibold">Hello</span>,
            <span className=" ml-4 text-3xl">{firstname}</span>
          </div>

          <div id="toggle" className=" text-yellow-500" onClick={darkMode}>
            
            {isDark ? (
              <svg
                className="fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="orange"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-4">
          <Card classname="bg-blue-100 p-4 shadow-xl   py-8 rounded-lg">
            <div className="flex justify-center items-center">
              <div className="">
                <svg className="fill-current w-10 h-10" viewBox="0 0 20 20">
                  <path
                    fill="blue"
                    d="M4.68,13.716v-0.169H4.554C4.592,13.605,4.639,13.658,4.68,13.716z M11.931,6.465
	c-0.307-0.087-0.623,0.106-0.706,0.432l-1.389,5.484c-0.901,0.084-1.609,0.833-1.609,1.757c0,0.979,0.793,1.773,1.773,1.773
	c0.979,0,1.773-0.794,1.773-1.773c0-0.624-0.324-1.171-0.812-1.486l1.377-5.439C12.422,6.887,12.239,6.552,11.931,6.465z
	M10.591,14.729H9.408v-1.182h1.183V14.729z M15.32,13.716c0.04-0.058,0.087-0.11,0.126-0.169H15.32V13.716z M10,3.497
	c-3.592,0-6.503,2.911-6.503,6.503H4.68c0-2.938,2.382-5.32,5.32-5.32s5.32,2.382,5.32,5.32h1.182
	C16.502,6.408,13.591,3.497,10,3.497z M10,0.542c-5.224,0-9.458,4.234-9.458,9.458c0,5.224,4.234,9.458,9.458,9.458
	c5.224,0,9.458-4.234,9.458-9.458C19.458,4.776,15.224,0.542,10,0.542z M15.32,16.335v0.167h-0.212
	c-1.407,1.107-3.179,1.773-5.108,1.773c-1.93,0-3.701-0.666-5.108-1.773H4.68v-0.167C2.874,14.816,1.724,12.543,1.724,10
	c0-4.571,3.706-8.276,8.276-8.276c4.57,0,8.275,3.706,8.275,8.276C18.275,12.543,17.126,14.816,15.32,16.335z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2">
                <h1 className="text-right font-semibo text-3xl ld text-blue-800">
                  {renderNumberOfInvestment()}
                </h1>
                <p className="text-blue-800"> Total Investment</p>
              </div>
            </div>
          </Card>

          <Card classname=" bg-green-100 p-4 shadow-xl   py-8 rounded-lg">
            <div className="flex justify-center items-center">
              <div className="">
                <svg className="fill-current w-10 h-10" viewBox="0 0 20 20">
                  <path
                    fill="green"
                    d="M4.68,13.716v-0.169H4.554C4.592,13.605,4.639,13.658,4.68,13.716z M11.931,6.465
	c-0.307-0.087-0.623,0.106-0.706,0.432l-1.389,5.484c-0.901,0.084-1.609,0.833-1.609,1.757c0,0.979,0.793,1.773,1.773,1.773
	c0.979,0,1.773-0.794,1.773-1.773c0-0.624-0.324-1.171-0.812-1.486l1.377-5.439C12.422,6.887,12.239,6.552,11.931,6.465z
	M10.591,14.729H9.408v-1.182h1.183V14.729z M15.32,13.716c0.04-0.058,0.087-0.11,0.126-0.169H15.32V13.716z M10,3.497
	c-3.592,0-6.503,2.911-6.503,6.503H4.68c0-2.938,2.382-5.32,5.32-5.32s5.32,2.382,5.32,5.32h1.182
	C16.502,6.408,13.591,3.497,10,3.497z M10,0.542c-5.224,0-9.458,4.234-9.458,9.458c0,5.224,4.234,9.458,9.458,9.458
	c5.224,0,9.458-4.234,9.458-9.458C19.458,4.776,15.224,0.542,10,0.542z M15.32,16.335v0.167h-0.212
	c-1.407,1.107-3.179,1.773-5.108,1.773c-1.93,0-3.701-0.666-5.108-1.773H4.68v-0.167C2.874,14.816,1.724,12.543,1.724,10
	c0-4.571,3.706-8.276,8.276-8.276c4.57,0,8.275,3.706,8.275,8.276C18.275,12.543,17.126,14.816,15.32,16.335z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2">
                <h1 className="text-right font-semibold text-3xl  text-green-800">
                  {renderNumberOfExpiredInvestment()}
                </h1>
                <p className="text-green-800">Expired Investment</p>
              </div>
            </div>
          </Card>

          <Card classname="bg-purple-100 p-4 shadow-xl   py-8 rounded-lg">
            <div className="flex justify-center items-center">
              <div className="">
                <svg className="fill-current w-10 h-10" viewBox="0 0 20 20">
                  <path
                    fill="purple"
                    d="M4.68,13.716v-0.169H4.554C4.592,13.605,4.639,13.658,4.68,13.716z M11.931,6.465
	c-0.307-0.087-0.623,0.106-0.706,0.432l-1.389,5.484c-0.901,0.084-1.609,0.833-1.609,1.757c0,0.979,0.793,1.773,1.773,1.773
	c0.979,0,1.773-0.794,1.773-1.773c0-0.624-0.324-1.171-0.812-1.486l1.377-5.439C12.422,6.887,12.239,6.552,11.931,6.465z
	M10.591,14.729H9.408v-1.182h1.183V14.729z M15.32,13.716c0.04-0.058,0.087-0.11,0.126-0.169H15.32V13.716z M10,3.497
	c-3.592,0-6.503,2.911-6.503,6.503H4.68c0-2.938,2.382-5.32,5.32-5.32s5.32,2.382,5.32,5.32h1.182
	C16.502,6.408,13.591,3.497,10,3.497z M10,0.542c-5.224,0-9.458,4.234-9.458,9.458c0,5.224,4.234,9.458,9.458,9.458
	c5.224,0,9.458-4.234,9.458-9.458C19.458,4.776,15.224,0.542,10,0.542z M15.32,16.335v0.167h-0.212
	c-1.407,1.107-3.179,1.773-5.108,1.773c-1.93,0-3.701-0.666-5.108-1.773H4.68v-0.167C2.874,14.816,1.724,12.543,1.724,10
	c0-4.571,3.706-8.276,8.276-8.276c4.57,0,8.275,3.706,8.275,8.276C18.275,12.543,17.126,14.816,15.32,16.335z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2">
                <h1 className="text-right font-semibold text-3xl  text-purple-800">
                  {renderNUmberOfExpiredAndPaid()}
                </h1>
                <p className="text-purple-800">Paid Investment</p>
              </div>
            </div>
          </Card>

          <Card classname="bg-yellow-100 p-4 shadow-xl   py-8 rounded-lg">
            <div className="flex justify-center items-center">
              <div className="">
                <svg className="fill-current w-10 h-10" viewBox="0 0 20 20">
                  <path
                    fill="orange"
                    d="M4.68,13.716v-0.169H4.554C4.592,13.605,4.639,13.658,4.68,13.716z M11.931,6.465
	c-0.307-0.087-0.623,0.106-0.706,0.432l-1.389,5.484c-0.901,0.084-1.609,0.833-1.609,1.757c0,0.979,0.793,1.773,1.773,1.773
	c0.979,0,1.773-0.794,1.773-1.773c0-0.624-0.324-1.171-0.812-1.486l1.377-5.439C12.422,6.887,12.239,6.552,11.931,6.465z
	M10.591,14.729H9.408v-1.182h1.183V14.729z M15.32,13.716c0.04-0.058,0.087-0.11,0.126-0.169H15.32V13.716z M10,3.497
	c-3.592,0-6.503,2.911-6.503,6.503H4.68c0-2.938,2.382-5.32,5.32-5.32s5.32,2.382,5.32,5.32h1.182
	C16.502,6.408,13.591,3.497,10,3.497z M10,0.542c-5.224,0-9.458,4.234-9.458,9.458c0,5.224,4.234,9.458,9.458,9.458
	c5.224,0,9.458-4.234,9.458-9.458C19.458,4.776,15.224,0.542,10,0.542z M15.32,16.335v0.167h-0.212
	c-1.407,1.107-3.179,1.773-5.108,1.773c-1.93,0-3.701-0.666-5.108-1.773H4.68v-0.167C2.874,14.816,1.724,12.543,1.724,10
	c0-4.571,3.706-8.276,8.276-8.276c4.57,0,8.275,3.706,8.275,8.276C18.275,12.543,17.126,14.816,15.32,16.335z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2">
                <h1 className="text-right font-semibold text-3xl  text-yellow-800">
                  {renderNUmberOfTerminatedAndPaid()}
                </h1>
                <p className="text-yellow-800">Terminated & Paid</p>
              </div>
            </div>
          </Card>
        </div>

        <div className=" grid md:grid-cols-2 gap-2 mt-8">
          <div className="p-4   bg-white shadow dark:bg-gray-800 dark:text-white border dark:border-gray-300">
            <h1 className=" font-semibold text-black md:text-2xl dark:text-gray-200">
              Company Account{" "}
            </h1>
            <p className="pt-2 text-sm text-gray-600">
              Bank payment Account Details
            </p>
            <div className="text-xs md:text-sm">
              <p className="pt-2">Aimart Investment Scheme</p>
              <p className="pt-2">014564325</p>
              <p className="pt-2">Zenith Bank</p>
            </div>
          </div>
          <div className="p-4 bg-white shadow dark:bg-gray-800 dark:text-white">
            <h1 className=" font-semibold text-black md:text-2xl dark:text-gray-200">
              Recent Activities{" "}
            </h1>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h1 className="font-semibold text-black md:text-xl mt-8 mb-4 dark:text-gray-200">
            Contact Us
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <h1 className=" font-semibold  text-sm">Get In Touch!</h1>
              <p className=" font-sans  mt-2 text-gray-600 text-xs md:text-sm">
                +234 907 895 89
              </p>
              <p className=" font-sans  mt-2 text-gray-600 text-xs md:text-sm">
                Km 42, Lekki-Epe Express Way, Oke-Ado, Sangotedo, Ajah, Lagos
              </p>
              <p className=" font-sans  mt-2 text-gray-600 text-xs md:text-sm">
                MallMart@gmail.com
              </p>
            </div>
            <div className="">
              <h1 className=" font-semibold   text-sm">Additional Resources</h1>
              <p className=" font-sans  mt-2 text-gray-600 text-xs md:text-sm">
                Schedule an inspection
              </p>
              <p className=" font-sans  mt-2 text-gray-600 text-sm">Careers</p>
              <p className=" font-sans  mt-2 text-gray-600 text-xs md:text-sm">
                Term and conditions
              </p>
              <p className=" font-sans  mt-2 text-gray-600 text-xs md:text-sm">
                Privacy policy
              </p>
            </div>
            <div className="">
              <h1 className=" font-semibold   text-sm">About us</h1>
              <p className=" font-sans mt-2 text-gray-600 text-xs md:text-sm">
                We offer you simplified, rewarding, and secure real estate
                investing. We make real estate investments accessible to
                everyone in a way that is simple, secure, and profitable
              </p>
              <div className="grid-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    firstname: state.currentuser.firstname,
    investments: state.investments,
  };
};

export default connect(mapStateToProps, { allInvestment })(Main);
