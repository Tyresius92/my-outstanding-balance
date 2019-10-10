import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import MoneyInput from "./MoneyInput";
import PercentInput from "./PercentInput";
import DebtTypeDropdown from "./DebtTypeDropdown";
import { getMonthlyInterestCharge } from "../utils/debt_projections";
import { normalizeNumber } from "../utils/number_utils";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const emptyRecord = {
  name: "",
  balance: "",
  interestRate: "",
  minimumPayment: "",
  type: ""
};

const DebtInputForm = ({ saveDebt }) => {
  const [record, setRecord] = useState(emptyRecord);

  const handleInputChange = e => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const isFormValid = () =>
    record.name.length !== 0 &&
    record.balance > 0 &&
    record.interestRate >= 0 &&
    record.minimumPayment >=
      getMonthlyInterestCharge(
        record.balance,
        record.interestRate,
        record.type
      );

  const onSubmitAttempt = e => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    saveDebt({
      name: record.name,
      balance: normalizeNumber(record.balance, 2),
      interestRate: normalizeNumber(record.interestRate, 1),
      minimumPayment: normalizeNumber(record.minimumPayment, 2),
      type: record.type
    });

    setRecord(emptyRecord);
  };

  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <form>
        <TextInput
          id="name"
          label="Debt Name"
          name="name"
          value={record.name}
          onChange={handleInputChange}
          placeholder="Visa Card"
        />
        <MoneyInput
          id="balance"
          label="Balance"
          name="balance"
          value={record.balance}
          onChange={handleInputChange}
          placeholder="123.45"
        />
        <MoneyInput
          id="minimumPayment"
          label="MinimumPayment"
          name="minimumPayment"
          value={record.minimumPayment}
          onChange={handleInputChange}
          placeholder="12.34"
        />
        <PercentInput
          id="interestRate"
          label="Interest Rate"
          name="interestRate"
          value={record.interestRate}
          onChange={handleInputChange}
          placeholder="15.3"
        />
        <DebtTypeDropdown
          id="debtType"
          label="Debt Type"
          name="type"
          value={record.type}
          onChange={handleInputChange}
        />
        <br />
        <Button
          id="debtInputSubmitButton"
          variant="contained"
          color="primary"
          onClick={onSubmitAttempt}
          disabled={!isFormValid()}
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

DebtInputForm.propTypes = {
  saveDebt: PropTypes.func.isRequired
};

export default DebtInputForm;
