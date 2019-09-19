import { shallow } from "enzyme";
import React from "react";
import App from "../App";
import Navbar from "../components/Navbar";

describe("App", () => {
  it("has a Navbar component", () => {
    const wrapper = shallow(<App />);
    const expecedLength = 1;

    expect(wrapper.find(Navbar).length).toBe(expecedLength);

    wrapper.unmount();
  });
});
