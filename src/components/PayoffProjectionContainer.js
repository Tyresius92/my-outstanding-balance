import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { getPayoffProjections } from "../utils/debt_projections";
import ProjectionBarChart from "./ProjectionBarChart";
import { Grid, Typography } from "@material-ui/core";

const PayoffProjectionContainer = props => {
  const [projections, setProjections] = useState([]);

  useMemo(() => {
    const [balanceProjections] = getPayoffProjections(
      props.debts,
      props.paymentAmount,
      Date.now()
    );
    setProjections(balanceProjections);
  }, [props]);

  return (
    <div style={{ height: 500, margin: "20px", padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={6} s={2}>
                               <div>
            <Typography>
              Total Interest: $
              {projections
                .reduce((acc, proj) => acc + proj.interest, 0)
                .toFixed(2)}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} s={10}>
          <ProjectionBarChart projections={projections} />
        </Grid>
      </Grid>
    </div>
  );
};

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
