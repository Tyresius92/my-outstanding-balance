import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const TextInput = ({ id, value, onChange, label, placeholder }) => (
  <TextField
    id={id}
    label={label}
    name="name"
    variant="outlined"
    value={value}
    onChange={onChange}
    margin="dense"
    required
    placeholder={placeholder}
    InputLabelProps={{
      shrink: true
    }}
  />
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default TextInput;
