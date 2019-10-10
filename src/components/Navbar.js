import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <MonetizationOnIcon />
          <Typography variant="h6" className={classes.title}>
            My Outstanding Balance
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
