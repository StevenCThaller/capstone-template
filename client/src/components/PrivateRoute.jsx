import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext); // Access the user state from userContext

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;