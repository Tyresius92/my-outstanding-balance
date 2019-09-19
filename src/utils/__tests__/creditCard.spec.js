import creditCard from "../creditCard";

describe("creditCard", () => {
  it("can be constructed", () => {
    expect(new creditCard()).toBeTruthy();
  });
});
