import React from "react";

const card = ({ classname, children }) => {
  return <div className={classname}>{children}</div>;
};

export default card;
