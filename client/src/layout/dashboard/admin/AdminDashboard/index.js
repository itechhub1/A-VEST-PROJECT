import React from "react";
import SideNav from "./sidenav";
import PrivateRoute from "../../../../privateROute/adminRoute";

const Index = ({ children }) => {
  return (
    <div className=" flex w-full h-screen">
      <PrivateRoute component={SideNav} />
      <div className="flex flex-1 m-2 md:m-4 overflow-y-scroll no-scrollbar">
        <PrivateRoute>{children}</PrivateRoute>
      </div>
    </div>
  );
};

export default Index;
