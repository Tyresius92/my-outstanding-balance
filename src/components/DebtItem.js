import React from "react";
import { DEBT_TYPES } from "../utils/debt_constants";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const DebtItem = ({ debt }) => (
  <Card>
    <CardContent>
      <Typography>Debt: {debt.name}</Typography>
      <Typography>Balance: ${debt.balance}</Typography>
      <Typography>Interest Rate: {debt.interestRate}%</Typography>
      <Typography>Minimum Payment: ${debt.minimumPayment}</Typography>
    </CardContent>
  </Card>
);

DebtItem.propTypes = {
  debt: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    interestRate: PropTypes.number.isRequired,
    minimumPayment: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(DEBT_TYPES))
  }).isRequired
};

export default DebtItem;
