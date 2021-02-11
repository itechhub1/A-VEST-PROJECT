import React from "react";
import { connect } from "react-redux";

import "./notification.css";

import { isArray } from "lodash";

const notification = ({ notification }) => {
  console.log(notification);
  const notifiationDisplay = () => {
    if (notification) {
      const { status, message } = notification;
      const type = isArray(message.error);
      if (type) {
        return (
          <ul>
            <li className="p-2 ">{message.error[0].message}</li>
          </ul>
        );
      } else {
        return <span className="p-4">{message}</span>;
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
