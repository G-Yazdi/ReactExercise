import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CustomizedSelect from "./select";
import Input from "./input";
import Joi from "joi-browser";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
});
class FormComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const {
      onFormValueChange,
      onFormSwitchChange,
      onFormSubmit,
      onImageChange,
      errors,
      avatar,
      firstName,
      lastName,
      phone,
      email,
      birthDate,
      title,
      isEmailVisible,
      gender,
      address,
    } = this.props;

    return (
      <form
        className={classes.root}
        style={{ display: "inline-block", position: "absolute" }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={{ display: "inline-block" }}
          component="label"
        >
          Change Picture
          <input
            type="file"
            style={{ display: "none" }}
            onChange={onImageChange}
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          style={{ display: "inline-block" }}
          component="label"
          onClick={onFormSubmit}
        >
          Submit
        </Button>
        <br />
        <Input
          name="firstName"
          value={firstName}
          label="First Name"
          style={{ width: "575px" }}
          onChange={onFormValueChange}
          error={errors.firstName}
        />
        <Input
          name="lastName"
          value={lastName}
          label="Last Name"
          style={{ width: "575px" }}
          onChange={onFormValueChange}
          error={errors.lastName}
        />
        <Input
          name="phone"
          value={phone}
          label="Phone"
          style={{ width: "575px" }}
          onChange={onFormValueChange}
          error={errors.phone}
        />
        <Input
          name="email"
          value={email}
          label="Email Address"
          style={{ width: "575px" }}
          onChange={onFormValueChange}
          error={errors.email}
        />
        <Input
          name="birthDate"
          value={birthDate}
          label="Birth Date"
          style={{ width: "575px" }}
          onChange={onFormValueChange}
          error={errors.birthDate}
        />
        <CustomizedSelect onChange={onFormValueChange} value={title} />
        <FormControlLabel
          style={{ display: "inline-block", width: "575px", margin: 0 }}
          control={
            <Switch
              onChange={onFormSwitchChange}
              checked={isEmailVisible}
              name="isEmailVisible"
            />
          }
          label="Display Email"
          labelPlacement="top"
        />
        <FormControl
          component="fieldset"
          style={{ display: "inline-block", width: "575px", margin: "8px" }}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            style={{ display: "inline-block" }}
            onChange={onFormValueChange}
            value={gender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <Input
          name="address"
          value={address}
          label="Address"
          style={{ width: "575px" }}
          onChange={onFormValueChange}
          error={errors.address}
        />
      </form>
    );
  }
}

export default withStyles(useStyles)(FormComponent);
