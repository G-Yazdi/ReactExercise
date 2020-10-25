import React from "react";
import TextField from "@material-ui/core/TextField";
const Input = ({ name, label, value, onChange, style, error }) => {
  return (
    <div className="form-group">
      <TextField
        style={style}
        id={name}
        name={name}
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
