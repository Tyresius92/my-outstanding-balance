import React from "react";
import { mount } from "enzyme";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("has a brand element", () => {
    const wrapper = mount(<Navbar />);
    const expectedLength = 1;

    const brands = wrapper.find({ enzymeid: "navbarBrand" }).hostNodes();

    expect(brands.length).toBe(expectedLength);
    wrapper.unmount();
  });

  it("displays the correct text in the nav brand", () => {
    const wrapper = mount(<Navbar />);

    const brand = wrapper.find({ enzymeid: "navbarBrand" }).hostNodes();

    expect(brand.text()).toBe("My Outstanding Balance");
    wrapper.unmount();
  });

  it("has a toggle and collapse pair", () => {
    const wrapper = mount(<Navbar />);
    const expectedLength = 1;

    const toggle = wrapper.find({ enzymeid: "navbarToggle" }).hostNodes();
    const collapseSection = wrapper
      .find({ enzymeid: "navbarCollapse" })
      .hostNodes();

    expect(toggle.length).toBe(expectedLength);
    expect(collapseSection.length).toBe(expectedLength);
    wrapper.unmount();
  });
});
