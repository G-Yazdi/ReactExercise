import React from "react";
import NavBar from "./navBar";
import Posts from "./posts";
import CssBaseline from "@material-ui/core/CssBaseline";

const Layout = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Posts />
    </React.Fragment>
  );
};

export default Layout;
