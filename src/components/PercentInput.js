import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const adornment = {
  endAdornment: <InputAdornment position="start">%</InputAdornment>
};

const PercentInput = ({
  id,
  value,
  name,
  placeholder,
  label,
  onChange,
  step
}) => (
  <TextField
    id={id}
    label={label}
    name={name}
    variant="outlined"
    value={value}
    onChange={onChange}
    type="number"
    inputProps={{ step }}
    InputProps={adornment}
    required
    margin="dense"
    placeholder={placeholder}
  />
);

PercentInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number
};

PercentInput.defaultProps = {
  step: 0.1
};

export default PercentInput;
