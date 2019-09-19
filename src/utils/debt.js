class debt {
  constructor(balance = 0, interestRate = 0, minimumPayment = 0) {
    this._balance = balance;
    this._interestRate = interestRate;
    this._minimumPayment = minimumPayment;
  }

  getBalance() {
    return this._balance;
  }

  getInterestRate() {
    return this._interestRate;
  }

  getMinimumPayment() {
    return this._minimumPayment;
  }
}

export default debt;
