import React, { Component } from "react";
import Joi from "joi-browser";

export default function withForm(rules, FormComponent) {
  class ValidatedFormComponent extends Component {
    constructor(props) {
      super(props);

      this.initialState = {
        ...this.props.initials,
        errors: {},
      };
      this.state = { ...this.initialState };

      // bind functions the form will use to this class
      this.onFormValueChange = this.onFormValueChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.validateProperty = this.validateProperty.bind(this);
      this.validateWholeForm = this.validateWholeForm.bind(this);

      // checks & messages for form fields. Keys must match form fields' names
      this.validations = rules;
    }
    validateProperty({ name, value }) {
      if (!this.validations[name]) return null;
      const obj = { [name]: value };
      const schema = { [name]: this.validations[name] };
      const { error } = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    }
    validateWholeForm = () => {
      const { error } = Joi.validate(this.state, this.validations, {
        abortEarly: false,
        allowUnknown: true,
      });
      console.log("errr", error);
      if (!error) {
        return null;
      }
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }

      return errors;
    };

    onFormValueChange = ({ currentTarget: input }) => {
      console.log("inputt", input);
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];

      this.setState({ [input.name]: input.value, errors });
    };
    onFormSwitchChange = ({ target: input }) => {
      this.setState({ [input.name]: input.checked });
    };

    onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          avatar: URL.createObjectURL(img),
        });
      }
    };

    onFormSubmit(e) {
      e.preventDefault();
      console.log("yesEr:", this.state.errors);
      const errors = this.validateWholeForm();
      this.setState({ errors: errors || {} });

      if (errors) {
        console.log("yesEr1:", errors);
        return;
      }
      this.props.onSubmit(e, this.state);
    }

    render() {
      return (
        <FormComponent
          {...this.state}
          onFormSubmit={this.onFormSubmit}
          onFormValueChange={this.onFormValueChange}
          onImageChange={this.onImageChange}
          onFormSwitchChange={this.onFormSwitchChange}
        />
      );
    }
  }
  return ValidatedFormComponent;
}
