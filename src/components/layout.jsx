import React from "react";
import NavBar from "./navBar";
import Posts from "./posts";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputForm from "./inputForm";
import { useState } from "react";

const Layout = () => {
  const [value, setValue] = useState("1234");
  const handleChange = (event) => {
    console.log("value:", event.target.value);
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <InputForm value={value} onChange={handleChange} />
    </React.Fragment>
  );
};

export default Layout;
