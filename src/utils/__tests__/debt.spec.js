import debt from "../debt";

describe("debt", () => {
  it("initializes values to zero if no constructor arguments given", () => {
    const myDebt = new debt();

    expect(myDebt.getBalance()).toBe(0);
    expect(myDebt.getInterestRate()).toBe(0);
    expect(myDebt.getMinimumPayment()).toBe(0);
  });

  it.each`
    balance | interestRate | minimumPayment
    ${0}    | ${0}         | ${0}
    ${100}  | ${0}         | ${0}
    ${100}  | ${10}        | ${0}
    ${100}  | ${10}        | ${20}
    ${0}    | ${10}        | ${0}
  `(
    "initializes class properties correctly",
    ({ balance, interestRate, minimumPayment }) => {
      const myDebt = new debt(balance, interestRate, minimumPayment);

      expect(myDebt.getBalance()).toBe(balance);
      expect(myDebt.getInterestRate()).toBe(interestRate);
      expect(myDebt.getMinimumPayment()).toBe(minimumPayment);
    }
  );
});
