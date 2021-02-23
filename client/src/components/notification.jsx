import React from "react";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";

import "./notification.css";

import { isArray } from "lodash";

const notification = ({ notification }) => {
 
  const notifiationDisplay = () => {
    if (notification) {
      const { status, message } = notification;
      
      const type = isArray(message.error);
      if (type) {
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Attention — <strong>{message.error[0].message}</strong>
          </Alert>
        );
      } else if ([400, 401, 500].includes(status)) {
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Attention — <strong>{message}</strong>
          </Alert>
        );
      } else {
        return (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Success — <strong>{message}</strong>
          </Alert>
        );
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center "
      style={{ position: "sticky", top: 0 }}
    >
      <div className="w-full">
        {Object.values(notification).length !== 0 && (
          <div>{notifiationDisplay()}</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state?.notification,
});

export default connect(mapStateToProps, {})(notification);
