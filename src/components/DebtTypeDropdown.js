import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { DEBT_TYPES } from "../utils/debt_constants";

const DebtTypeDropdown = props => {
  // Set up the label width. Required for Select components
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  // Handle the open/closed state of the dropdown
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl
      fullWidth
      required
      variant="outlined"
      margin="dense"
      style={{ marginTop: "20px" }}
    >
      <InputLabel ref={inputLabel}>{props.label}</InputLabel>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={props.value}
        onChange={props.onChange}
        labelWidth={labelWidth}
        inputProps={{
          name: props.name
        }}
      >
        {Object.values(DEBT_TYPES).map((curr, index) => (
          <MenuItem key={`${curr}_${index}`} value={curr}>
            {curr}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

DebtTypeDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default DebtTypeDropdown;
