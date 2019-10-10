import React from "react";
import PropTypes from "prop-types";
import { getPayoffProjections } from "../utils/debt_projections";
import ProjectionBarChart from "./ProjectionBarChart";
import Grid from "@material-ui/core/Grid";

class PayoffProjectionContainer extends React.Component {
  state = {
    projections: [],
    debts: []
  };

  componentDidMount = () => {
    const [balanceProjections, debtProjections] = getPayoffProjections(
      this.props.debts,
      this.props.paymentAmount,
      Date.now()
    );

    this.setState({
      projections: balanceProjections,
      debts: debtProjections
    });
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.debts.length !== this.props.debts.length ||
      prevProps.paymentAmount !== this.props.paymentAmount
    ) {
      const [balanceProjections, debtProjections] = getPayoffProjections(
        this.props.debts,
        this.props.paymentAmount,
        Date.now()
      );

      this.setState({
        projections: balanceProjections,
        debts: debtProjections
      });
    }
  };

  render() {
    return (
      <div style={{ height: 500, margin: "20px", padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} s={2}>
            <div>
              Total Interest:{" "}
              {this.state.projections.reduce(
                (acc, proj) => acc + proj.interest,
                0
              )}
            </div>
          </Grid>
          <Grid item xs={12} s={10}>
            <ProjectionBarChart projections={this.state.projections} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

PayoffProjectionContainer.propTypes = {
  debts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      interestRate: PropTypes.number.isRequired,
      minimumPayment: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  paymentAmount: PropTypes.string.isRequired
};

export default PayoffProjectionContainer;
