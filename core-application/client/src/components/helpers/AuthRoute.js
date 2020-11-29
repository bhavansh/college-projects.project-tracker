import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const mapStatesToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStatesToProps)(PrivateRoute);
