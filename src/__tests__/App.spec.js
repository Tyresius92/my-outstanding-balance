import { shallow } from "enzyme";
import React from "react";
import App from "../App";

describe("App", () => {
  it("renders the right text", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.text()).toBe("Hello, World!");
  });
});
