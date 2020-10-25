import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Layout from "./components/layout";
import FormComponent from "./components/assignment04/form";
import DisplayImage from "./components/assignment04/displayImage";
import withForm from "./components/assignment04/hoc/withForm";
import DisplayDataComponent from "./components/assignment04/displayDataComponent";
import Joi from "joi-browser";

function App() {
  const [initialValues, setValues] = React.useState({
    avatar: undefined,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    title: "",
    isEmailVisible: true,
    gender: "",
    address: "",
  });
  const validate = {
    firstName: Joi.string()
      .required()
      .error(() => {
        return {
          message: "required",
        };
      }),
    lastName: Joi.string()
      .required()
      .error(() => {
        return {
          message: "required",
        };
      }),
    phone: Joi.string()
      .regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
      .error(() => {
        return {
          message: "invalid",
        };
      }),
    email: Joi.string()
      .regex(/[^@]+@[^.]+..+/)
      .error(() => {
        return {
          message: "invalid",
        };
      }),
    birthDate: Joi.string()
      .regex(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
      .error(() => {
        return {
          message: "invalid",
        };
      }),
  };
  const handleSubmit = (e, values) => {
    e.preventDefault();
    setValues({ ...values });
  };

  const WithForm = withForm(validate, FormComponent);

  return (
    <React.Fragment>
      <DisplayDataComponent values={initialValues} />

      <WithForm initials={initialValues} onSubmit={handleSubmit} />
    </React.Fragment>
  );
}

export default App;
