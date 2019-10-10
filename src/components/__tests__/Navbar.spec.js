import React from "react";
import { mount } from "enzyme";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("renders", () => {
    expect(mount(<Navbar />).exists()).toBeTruthy();
  });
});
