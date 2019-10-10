import { addMonths, getFormattedChartLabelDate } from "../date_utils";

describe("date_utils", () => {
  describe("addMonths", () => {
    it("returns the same value if 0 months added", () => {
      // 1569695179000 is Sept 28, 2019
      const now = 1569695179000;
      const noMonths = 0;

      expect(addMonths(now, noMonths)).toBe(now);
    });

    it("returns the correct value if 1 month is added", () => {
      // 1569695179000 is Sept 28, 2019
      const now = 1569695179000;
      const oneMonth = 1;

      // 1572287179000 is Oct 28, 2019
      const expected = 1572287179000;

      expect(addMonths(now, oneMonth)).toBe(expected);
    });

    it("correctly adjusts the date adding 1 month to the 31st", () => {
      // 1564545600000 is Aug 31, 2019
      const now = 1564545600000;
      const oneMonth = 1;

      // 1567224000000 is Sept 30, 2019
      const expected = 1567224000000;

      expect(addMonths(now, oneMonth)).toBe(expected);
    });

    // skipped because daylight savings time happens in the first week of March
    it.skip("handles leap years correctly", () => {
      // 1582952400000 is Feb 29, 2020
      const now = 1582952400000;
      const oneMonth = 1;

      // 1585454400000 is March 29, 2020
      const expected = 1585454400000;

      expect(addMonths(now, oneMonth)).toBe(expected);
    });

    it("handles going to leap year month correctly", () => {
      // 1580446800000 is Jan 31, 2020
      const now = 1580446800000;
      const oneMonth = 1;

      // 1582952400000 is Feb 29, 2020
      const expected = 1582952400000;

      expect(addMonths(now, oneMonth)).toBe(expected);
    });

    // skipped because daylight savings happens in the first week of March
    it.skip("handles jumping over leap year month correctly", () => {
      // 1580446800000 is Jan 31, 2020
      const now = 1580446800000;
      const oneMonth = 2;

      // 1585454400000 is March 31, 2020
      const expected = 1585627200000;

      expect(addMonths(now, oneMonth)).toBe(expected);
    });
  });

  describe("getFormattedChartLabelDate", () => {
    it("returns the correct date", () => {
      const date = 1580446800000;
      const expected = "Jan 2020";

      expect(getFormattedChartLabelDate(date)).toBe(expected);
    });

    it("returns the correct date with leap years", () => {
      const date = 1582952400000;
      const expected = "Feb 2020";

      expect(getFormattedChartLabelDate(date)).toBe(expected);
    });
  });
});
