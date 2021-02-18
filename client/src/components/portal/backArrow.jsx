import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
const backArrow = () => {
  return (
    <>
      <Button
        onClick={() => window.location.assign("/")}
        variant='outlined'
        color='secondary'
        style={{ outline: 0, marginBottom: 10 }}
        startIcon={<ArrowBackIcon />}
      >
        Go back
      </Button>
    </>
  );
};

export default backArrow;
