import React from "react";
import { shallow } from "enzyme";
import DebtInputForm from "../DebtInputForm";

describe("DebtInputForm", () => {
  const mockFn = jest.fn();

  it("renders", () => {
    const component = shallow(<DebtInputForm saveDebt={mockFn} />);

    expect(component.exists()).toBeTruthy();
  });

  it("renders a submit button", () => {
    const component = shallow(<DebtInputForm saveDebt={mockFn} />);

    const buttons = component.find("#debtInputSubmitButton");

    expect(buttons.length).toBe(1);
  });
});
