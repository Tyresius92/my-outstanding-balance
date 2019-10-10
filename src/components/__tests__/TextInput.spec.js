import React from "react";
import { shallow } from "enzyme";
import TextInput from "../TextInput";

describe("TextInput", () => {
  it("onChange param is the event", () => {
    const mockFn = jest.fn();
    const input = shallow(
      <TextInput
        id="theId"
        name="theName"
        label="theLabel"
        value=""
        placeholder=""
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
