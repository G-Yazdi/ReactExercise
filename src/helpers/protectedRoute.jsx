import { Route, Redirect } from "react-router-dom";
import { UserContext } from "provider/AuthProvider";
import React, { useContext } from "react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
