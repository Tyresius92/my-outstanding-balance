import { normalizeNumber } from "../number_utils";

describe("number_utils", () => {
  describe("normalizeNumber", () => {
    it("removes all decimals after the given place", () => {
      const testNum = 123.456789;
      const numDecimals = 2;
      const expected = 123.46;

      expect(normalizeNumber(testNum, numDecimals)).toBe(expected);
    });

    it("works when given 0 digits", () => {
      const testNum = 123.456789;
      const numDecimals = 0;
      const expected = 123;

      expect(normalizeNumber(testNum, numDecimals)).toBe(expected);
    });
  });
});
