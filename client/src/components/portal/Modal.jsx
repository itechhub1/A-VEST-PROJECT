import React from "react";
import ReactDom from "react-dom";
import "./modal.css";

//import BackArrow from "./backArrow";

const Modal = ({ children }) => {
  return ReactDom.createPortal(
    <div className="flex  flex-col justify-center modalPortal child__modal items-center  w-full ">
      <div className=" ">
        <div className="bg-white rounded-lg p-6   sm:mx-0">{children}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
