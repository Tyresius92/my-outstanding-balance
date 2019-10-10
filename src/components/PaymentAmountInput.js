import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "./MoneyInput";

const PaymentAmountInput = ({ value, updatePaymentAmount }) => (
  <MoneyInput
    id="paymentAmount"
    name="paymentAmount"
    value={value}
    onChange={updatePaymentAmount}
    label="Maximum you can pay?"
    placeholder="120.00"
    step
  />
);

PaymentAmountInput.propTypes = {
  value: PropTypes.string.isRequired,
  updatePaymentAmount: PropTypes.func.isRequired
};

export default PaymentAmountInput;
