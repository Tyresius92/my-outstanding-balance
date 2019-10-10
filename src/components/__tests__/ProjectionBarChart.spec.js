import React from "react";
import { shallow } from "enzyme";
import ProjectionBarChart from "../ProjectionBarChart";
import { Bar } from "react-chartjs-2";

describe("ProjectionBarChart", () => {
  const mockProjections = [
    {
      month: "Jan 2019",
      balance: 123.45,
      interest: 10
    },
    {
      month: "Feb 2019",
      balance: 60.6,
      interest: 5
    },
    {
      month: "Mar 2019",
      balance: 0,
      interest: 0
    }
  ];

  it("renders", () => {
    const component = shallow(
      <ProjectionBarChart projections={mockProjections} />
    );

    expect(component.exists()).toBeTruthy();
  });

  it("gives the correct labels", () => {
    const component = shallow(
      <ProjectionBarChart projections={mockProjections} />
    );

    const chart = component.find(Bar).first();

    const expectedLabels = ["Jan 2019", "Feb 2019", "Mar 2019"];

    expect(chart.props().data.labels).toStrictEqual(expectedLabels);
  });

  it("gives the correct balance", () => {
    const component = shallow(
      <ProjectionBarChart projections={mockProjections} />
    );

    const chart = component.find(Bar).first();

    const expectedBalances = [123.45, 60.6, 0];

    expect(
      chart.props().data.datasets.find(dataObj => dataObj.label === "Balance")
        .data
    ).toStrictEqual(expectedBalances);
  });

  it("gives the correct interest charges", () => {
    const component = shallow(
      <ProjectionBarChart projections={mockProjections} />
    );

    const chart = component.find(Bar).first();

    const expectedInterest = [10, 5, 0];

    expect(
      chart.props().data.datasets.find(dataObj => dataObj.label === "Interest")
        .data
    ).toStrictEqual(expectedInterest);
  });
});
