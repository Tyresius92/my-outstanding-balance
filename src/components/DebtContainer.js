import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import DebtList from "./DebtList";
import DebtInputForm from "./DebtInputForm";
import PayoffProjectionContainer from "./PayoffProjectionContainer";
import PaymentAmountInput from "./PaymentAmountInput";

const DebtContainer = () => {
  const [debts,setDebts] = useState([]);
  const [maxPayment,setMaxPayment] = useState("");

  return (
    <Container>
      <DebtInputForm saveDebt={(newDebt) => setDebts(debts.concat(newDebt))} />
      <DebtList debts={debts} />
      <PaymentAmountInput
        value={maxPayment}
        updatePaymentAmount={(e) => setMaxPayment(e.target.value)}
      />
      <PayoffProjectionContainer
        paymentAmount={maxPayment}
        debts={debts}
      />
    </Container>
  );

}

export default DebtContainer;
