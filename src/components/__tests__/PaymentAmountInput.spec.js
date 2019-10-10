import React from "react";
import { shallow } from "enzyme";
import PaymentAmountInput from "../PaymentAmountInput";

describe("PaymentAmountInput", () => {
  it("onChange param is the event", () => {
    const mockFn = jest.fn();
    const input = shallow(
      <PaymentAmountInput value="" updatePaymentAmount={mockFn} />
    );

    const pretendEventObj = {
      id: "helloWorld"
    };

    input.find("#paymentAmount").simulate("change", pretendEventObj);
    expect(mockFn.mock.calls[0][0]).toBe(pretendEventObj);
  });
});
