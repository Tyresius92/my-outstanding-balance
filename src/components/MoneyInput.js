import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const MoneyInput = ({ id, name, value, onChange, label, placeholder }) => (
  <TextField
    id={id}
    label={label}
    name={name}
    type="number"
    variant="outlined"
    value={value}
    onChange={onChange}
    margin="dense"
    required
    placeholder={placeholder}
    inputProps={{
      step: 0.01
    }}
    InputProps={{
      startAdornment: <InputAdornment position="start">$</InputAdornment>
    }}
    InputLabelProps={{
      shrink: true
    }}
  />
);

MoneyInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default MoneyInput;
