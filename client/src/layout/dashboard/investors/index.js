import React from "react";
import SideNav from "./sidenav";
import PrivateRoute from "../../../privateROute/userRoute";

const Index = ({ children }) => {
  return (
    <div className=" flex w-full h-screen">
      <PrivateRoute component={SideNav} />
      <div className=" flex flex-col flex-1 flex-wrap m-2 md:m-4 overflow-y-scroll no-scrollbar">
        <PrivateRoute>{children}</PrivateRoute>
      </div>
    </div>
  );
};

export default Index;
