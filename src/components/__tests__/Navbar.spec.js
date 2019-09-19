import React from "react";
import { shallow, mount } from "enzyme";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("has a brand element", () => {
    const wrapper = mount(<Navbar />);

    const brands = wrapper.find({ enzymeid: "navbarBrand" }).hostNodes();

    expect(brands.length).toBe(1);
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

    const toggle = wrapper.find({ enzymeid: "navbarToggle" }).hostNodes();
    const collapseSection = wrapper
      .find({ enzymeid: "navbarCollapse" })
      .hostNodes();

    expect(toggle.length).toBe(1);
    expect(collapseSection.length).toBe(1);
    wrapper.unmount();
  });
});
