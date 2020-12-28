import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LocalStorage } from "../../services";
import { string } from "../../helpers";

const ProtectedRoute = ({
  path,
  history,
  roles,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      history={history}
      render={(props) => {
        if (!LocalStorage.getCurrentUser()) {
          return (
            <Redirect
              to={{
                pathname: "/account/login",
                state: { from: props.location },
              }}
            />
          );
        } else if (!string.containsAny(AuthService.getRole(), roles)) {
          // Check roles, If the user doesn't contain any role, redirect the user to page 403
          return (
            <Redirect
              to={{
                pathname: "/403",
                state: { from: props.location },
              }}
            />
          );
        } else {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
