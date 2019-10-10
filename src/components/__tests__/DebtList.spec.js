import React from "react";
import { shallow } from "enzyme";
import DebtList from "../DebtList";
import DebtItem from "../DebtItem";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

describe("DebtList", () => {
  it("contains a single GridList", () => {
    const wrapper = shallow(<DebtList />);
    const expectedLength = 1;

    const gridLists = wrapper.find(GridList);

    expect(gridLists.length).toBe(expectedLength);
  });

  it("renders no GridListTiles if no debts given", () => {
    const wrapper = shallow(<DebtList />);
    const expectedLength = 0;

    const tiles = wrapper.find(GridListTile);

    expect(tiles.length).toBe(expectedLength);
  });

  it("renders one DebtItem if one debt given", () => {
    const myDebts = [
      {
        name: "Chase Sapphire Reserve",
        balance: 24000,
        interestRate: 23.4,
        minimumPayment: 480
      }
    ];

    const wrapper = shallow(<DebtList debts={myDebts} />);
    const expectedLength = 1;

    const items = wrapper.find(DebtItem);

    expect(items.length).toBe(expectedLength);
  });

  it("renders two DebtItems if two debts given", () => {
    const myDebts = [
      {
        name: "Chase Sapphire Reserve",
        balance: 24000,
        interestRate: 23.4,
        minimumPayment: 480
      },
      {
        name: "Discover",
        balance: 5000,
        interestRate: 21.8,
        minimumPayment: 100
      }
    ];

    const wrapper = shallow(<DebtList debts={myDebts} />);
    const expectedLength = 2;

    const items = wrapper.find(DebtItem);

    expect(items.length).toBe(expectedLength);
  });
});
