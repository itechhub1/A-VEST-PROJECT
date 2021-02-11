import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CurrentUser } from "../action/auth/currentUser";
import history from "../history";

import { Link } from "react-router-dom";

const PrivateRoute = ({ user, CurrentUser, component: Component, ...rest }) => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    CurrentUser(() => setloading(false));
  }, [user.isAuth, loading]);

  if (!user.isAuth && loading)
    return (
      <div className="flex justify-center items-center h-screen  w-full">
        <p className="text-center">loading...</p>
      </div>
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isAuth && !loading ? history.push("/") : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return { user: state.CurrentUser };
};

export default connect(mapStateToProps, { CurrentUser })(PrivateRoute);
