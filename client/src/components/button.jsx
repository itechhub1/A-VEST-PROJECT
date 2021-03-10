import { Button } from "@material-ui/core";

import React from "react";

const button = ({ size, disabled, classes, color ,children,variant }) => {
  return (
    <Button className={classes} size={size} disabled={disabled} color={color} variant={variant}>
      {children}
    </Button>
  );
};

export default button;
