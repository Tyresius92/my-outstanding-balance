import React from "react";
import { shallow } from "enzyme";
import NotFound404 from "../NotFound404";

describe("NotFound404", () => {
  it("renders the 404 h1 element", () => {
    const component = shallow(<NotFound404 />);

    const headers = component.find("#header404");

    expect(headers.length).toBe(1);
  });
});
