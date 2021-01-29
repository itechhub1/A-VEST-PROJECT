import React from "react";
import SideNav from "./sidenav";

const Index = ({ children }) => {
  return (
    <div className=" flex w-full h-screen">
      <SideNav />
      <div className="flex flex-1 m-2 md:m-4 overflow-y-scroll no-scrollbar">{children}</div>
    </div>
  );
};

export default Index;
