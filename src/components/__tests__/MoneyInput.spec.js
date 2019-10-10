import React from "react";
import { shallow } from "enzyme";
import MoneyInput from "../MoneyInput";

describe("MoneyInput", () => {
  it("onChange param is the event", () => {
    const mockFn = jest.fn();
    const input = shallow(
      <MoneyInput
        id="theId"
        name="theName"
        label="theLabel"
        value=""
        placeholder=""
        className=""
        onChange={mockFn}
      />
    );

    const pretendEventObj = {
      id: "helloWorld"
    };

    input.find("#theId").simulate("change", pretendEventObj);
    expect(mockFn.mock.calls[0][0]).toBe(pretendEventObj);
  });
});
