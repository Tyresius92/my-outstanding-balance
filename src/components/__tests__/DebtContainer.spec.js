import React from "react";
import { shallow } from "enzyme";
import DebtList from "../DebtList";
import DebtContainer from "../DebtContainer";
import DebtInputForm from "../DebtInputForm";

describe("DebtContainer", () => {
  it("has a DebtList component", () => {
    const wrapper = shallow(<DebtContainer />);
    const expectedLength = 1;

    expect(wrapper.find(DebtList).length).toBe(expectedLength);

    wrapper.unmount();
  });

  it("has a DebtInputForm component", () => {
    const wrapper = shallow(<DebtContainer />);
    const expectedLength = 1;

    expect(wrapper.find(DebtInputForm).length).toBe(expectedLength);

    wrapper.unmount();
  });
});
