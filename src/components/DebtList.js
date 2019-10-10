import React from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import DebtItem from "./DebtItem";

const DebtList = props => (
  <div>
    <GridList cellHeight={160} cols={3}>
      {props.debts.map((debt, index) => (
        <GridListTile key={`${debt.name}_${index}`} cols={1}>
          <DebtItem key={`${debt.name}_${index}`} debt={debt} />
        </GridListTile>
      ))}
    </GridList>
  </div>
);

DebtList.defaultProps = {
  debts: []
};

DebtList.propTypes = {
  debts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      interestRate: PropTypes.number.isRequired,
      minimumPayment: PropTypes.number.isRequired
    })
  )
};

export default DebtList;
