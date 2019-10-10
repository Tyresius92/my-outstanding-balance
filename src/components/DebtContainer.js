import React from "react";
import Container from "@material-ui/core/Container";
import DebtList from "./DebtList";
import DebtInputForm from "./DebtInputForm";
import PayoffProjectionContainer from "./PayoffProjectionContainer";
import PaymentAmountInput from "./PaymentAmountInput";

class DebtContainer extends React.Component {
  state = {
    debts: [],
    maxPayment: ""
  };

  createDebtRecord = newDebt => {
    this.setState({
      debts: this.state.debts.concat([newDebt])
    });
  };

  updatePaymentAmount = e => {
    this.setState({
      maxPayment: e.target.value
    });
  };

  render() {
    return (
      <Container>
        <DebtInputForm saveDebt={this.createDebtRecord} />
        <DebtList debts={this.state.debts} />
        <PaymentAmountInput
          value={this.state.maxPayment}
          updatePaymentAmount={this.updatePaymentAmount}
        />
        <PayoffProjectionContainer
          paymentAmount={this.state.maxPayment}
          debts={this.state.debts}
        />
      </Container>
    );
  }
}

export default DebtContainer;
