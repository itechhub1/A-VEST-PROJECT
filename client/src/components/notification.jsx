import React from "react";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";

import "./notification.css";

import { isArray } from "lodash";

const notification = ({ notification }) => {
  console.log(notification);
  const notifiationDisplay = () => {
    if (notification) {
      const { status, message } = notification;
      console.log(status);
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
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Success — <strong>{message}</strong>
        </Alert>;
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
          /*  <Alert
          severity={
            notification.status === (400 || 500 || 401) ? "error" : "success"
          }
          className='w-full'
        >
          {notifiationDisplay()}
        </Alert>
 */
          <div
            className={
              [400, 401, 500].includes(notification.status)
                ? " bg-red-200 text-red-800"
                : " bg-green-200 text-green-800"
            }
          >
            {notifiationDisplay()}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state?.notification,
});

export default connect(mapStateToProps, {})(notification);
