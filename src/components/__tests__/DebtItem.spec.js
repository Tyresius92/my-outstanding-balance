import React from "react";
import { shallow } from "enzyme";
import DebtItem from "../DebtItem";

describe("DebtItem", () => {
  it("renders", () => {
    const debt = {
      name: "My Terrible Debt",
      balance: 24000,
      minimumPayment: 100,
      interestRate: 23.4
    };

    const wrapper = shallow(<DebtItem id={"hello"} debt={debt} />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
