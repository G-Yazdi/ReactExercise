import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import Main from "./Main";
import { UserContext } from "provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const user = useContext(UserContext);
  console.log("userr", user);
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route component={Main} />
        </Switch>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}
