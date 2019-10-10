import {
  isLastIndex,
  getTotalBalance,
  getAvalancheSortedDebts,
  getSnowballSortedDebts,
  getExtraPaymentAmount,
  getMonthlyInterestCharge,
  getMonthlyCreditCardInterestCharge,
  getMonthlyStudentLoanInterestCharge,
  getDebtsAfterInterestApplied,
  getDebtsAfterMinimums,
  getDebtsAfterPayments,
  getIndexOfHighestInterestDebtWithBalance,
  getPayoffProjections
} from "../debt_projections";
import { DEBT_TYPES } from "../debt_constants";

describe("debt_projections", () => {
  describe("isLastIndex", () => {
    it("returns true if given an array and the last index of the array", () => {
      const sampleData = [1, 2, 3];

      expect(isLastIndex(sampleData, 0)).toBe(false);
      expect(isLastIndex(sampleData, 1)).toBe(false);
      expect(isLastIndex(sampleData, 2)).toBe(true);
      expect(isLastIndex(sampleData, 3)).toBe(false);
    });
  });

  describe("getTotalBalance", () => {
    it("returns the correct total balance", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];
      const expected = 1334; // sum of balances in sample data

      expect(getTotalBalance(sampleData)).toBe(expected);
    });
  });

  describe("getAvalancheSortedDebts", () => {
    it("returns a list of debts sorted low to high by interest rate", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 4,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expected = [
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 4,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      expect(getAvalancheSortedDebts(sampleData)).toStrictEqual(expected);
    });

    it("puts lower balance closer to end in case of interestRate tie", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 12,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 4,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expected = [
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 4,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My Visa",
          balance: 540,
          interestRate: 12,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      expect(getAvalancheSortedDebts(sampleData)).toStrictEqual(expected);
    });

    it("works with tying interestRate in the middle", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 12,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 4,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My Chase Card",
          balance: 140,
          interestRate: 20,
          minimumPayment: 10,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expected = [
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 4,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My Visa",
          balance: 540,
          interestRate: 12,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My Chase Card",
          balance: 140,
          interestRate: 20,
          minimumPayment: 10,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      expect(getAvalancheSortedDebts(sampleData)).toStrictEqual(expected);
    });
  });

  describe("getSnowballSortedDebts", () => {
    it("returns a list of debts sorted low to high by balance", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expected = [
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      expect(getSnowballSortedDebts(sampleData)).toStrictEqual(expected);
    });
  });

  describe("getExtraPaymentAmount", () => {
    it("retuns 0 if the balance is 0", () => {
      const myBalance = 0;
      const availableAmount = 100;
      const expected = 0;

      expect(getExtraPaymentAmount(myBalance, availableAmount)).toBe(expected);
    });

    it("returns 0 if availableAmount is 0", () => {
      const myBalance = 100;
      const availableAmount = 0;
      const expected = 0;

      expect(getExtraPaymentAmount(myBalance, availableAmount)).toBe(expected);
    });

    it("returns the balance if balance is less than availableAmount", () => {
      const myBalance = 50;
      const availableAmount = 100;
      const expected = 50;

      expect(getExtraPaymentAmount(myBalance, availableAmount)).toBe(expected);
    });

    it("returns availableAmount if availableAmount less than balance", () => {
      const myBalance = 100;
      const availableAmount = 70;
      const expected = 70;

      expect(getExtraPaymentAmount(myBalance, availableAmount)).toBe(expected);
    });
  });

  describe("getMonthlyInterestCharge", () => {
    it("returns the correct value for credit cards", () => {
      const myBalance = 100;
      const myInterestRate = 10;
      const myDebtType = DEBT_TYPES.CREDIT_CARD;

      const expected = 0.82;

      expect(
        getMonthlyInterestCharge(myBalance, myInterestRate, myDebtType)
      ).toBe(expected);
    });

    it("returns the correct value for credit cards", () => {
      const myBalance = 10000;
      const myInterestRate = 7;
      const myDebtType = DEBT_TYPES.STUDENT_LOAN;

      const expected = 57.53;

      expect(
        getMonthlyInterestCharge(myBalance, myInterestRate, myDebtType)
      ).toBe(expected);
    });
  });

  describe("getMonthlyCreditCardInterestCharge", () => {
    it("returns the correct charge when interestRate is 0", () => {
      const myBalance = 100;
      const myInterestRate = 0;

      const expected = 0;

      expect(
        getMonthlyCreditCardInterestCharge(myBalance, myInterestRate)
      ).toBe(expected);
    });

    it("returns the correct charge when balance is 0", () => {
      const myBalance = 0;
      const myInterestRate = 10;

      const expected = 0;

      expect(
        getMonthlyCreditCardInterestCharge(myBalance, myInterestRate)
      ).toBe(expected);
    });

    it("returns the correct interest charge", () => {
      const myBalance = 100;
      const myInterestRate = 10;

      const expectedInterestCharge = 0.82;

      expect(
        getMonthlyCreditCardInterestCharge(myBalance, myInterestRate)
      ).toBe(expectedInterestCharge);
    });
  });

  describe("getMonthlyStudentLoanInterestCharge", () => {
    it("returns the correct charge when interestRate is 0", () => {
      const myBalance = 100;
      const myInterestRate = 0;

      const expected = 0;

      expect(
        getMonthlyStudentLoanInterestCharge(myBalance, myInterestRate)
      ).toBe(expected);
    });

    it("returns the correct charge when balance is 0", () => {
      const myBalance = 0;
      const myInterestRate = 10;

      const expected = 0;

      expect(
        getMonthlyStudentLoanInterestCharge(myBalance, myInterestRate)
      ).toBe(expected);
    });

    it("returns the correct interest charge", () => {
      const myBalance = 100;
      const myInterestRate = 10;

      const expectedInterestCharge = 0.82;

      expect(
        getMonthlyStudentLoanInterestCharge(myBalance, myInterestRate)
      ).toBe(expectedInterestCharge);
    });
  });

  describe("getDebtsAfterInterestApplied", () => {
    it("adds the interest to the current balance of the debt", () => {
      const myDebts = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expected = [
        {
          balance: 547.55,
          interestRate: 17,
          minimumPayment: 30,
          name: "My Visa",
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          balance: 100.82,
          interestRate: 10,
          minimumPayment: 20,
          name: "My MasterCard",
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          balance: 1238.06,
          interestRate: 4,
          minimumPayment: 50,
          name: "Discover",
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      expect(getDebtsAfterInterestApplied(myDebts)).toStrictEqual(expected);
    });
  });

  describe("getDebtsAfterMinimums", () => {
    it("pays the minimum", () => {
      const myDebts = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expectedDebts = [
        {
          name: "My Visa",
          balance: 510,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 80,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1184,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expectedPaymentAmount = 100;

      expect(getDebtsAfterMinimums(myDebts)).toStrictEqual([
        expectedDebts,
        expectedPaymentAmount
      ]);
    });

    it("pays the minimum", () => {
      const myDebts = [
        {
          name: "My Visa",
          balance: 25,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 40,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const expectedDebts = [
        {
          name: "My Visa",
          balance: 0,
          interestRate: 17,
          minimumPayment: 0,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 80,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 0,
          interestRate: 4,
          minimumPayment: 0,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];
      const expectedPaymentAmount = 85;

      expect(getDebtsAfterMinimums(myDebts)).toStrictEqual([
        expectedDebts,
        expectedPaymentAmount
      ]);
    });
  });

  describe("getDebtsAfterPayments", () => {
    it("correctly calculates the debts", () => {
      const myDebts = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];
      const paymentAmount = 150;

      const expectedDebts = [
        {
          name: "My Visa",
          balance: 460,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 80,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1184,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      expect(getDebtsAfterPayments(myDebts, paymentAmount)).toStrictEqual(
        expectedDebts
      );
    });
  });

  describe("getIndexOfHighestInterestDebtWithBalance", () => {
    it("returns the correct index when last index is correct", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 540,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      // "My Visa" has highest interest rate and has a balance
      const expected = 0;

      expect(getIndexOfHighestInterestDebtWithBalance(sampleData)).toBe(
        expected
      );
    });

    it("correctly ignores an index with zero balance", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 0,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 1234,
          interestRate: 4,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      // "My Visa" has highest interest rate and has a balance
      const expected = 1;

      expect(getIndexOfHighestInterestDebtWithBalance(sampleData)).toBe(
        expected
      );
    });

    it("correctly ignores multiple indices with zero balance", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 0,
          interestRate: 17,
          minimumPayment: 30,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "Discover",
          balance: 0,
          interestRate: 12,
          minimumPayment: 50,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      // "My Visa" has highest interest rate and has a balance
      const expected = 1;

      expect(getIndexOfHighestInterestDebtWithBalance(sampleData)).toBe(
        expected
      );
    });
  });

  describe("getPayoffProjections", () => {
    it("to return the correct projections", () => {
      const sampleData = [
        {
          name: "My Visa",
          balance: 50,
          interestRate: 17,
          minimumPayment: 20,
          type: DEBT_TYPES.CREDIT_CARD
        },
        {
          name: "My MasterCard",
          balance: 100,
          interestRate: 10,
          minimumPayment: 25,
          type: DEBT_TYPES.CREDIT_CARD
        }
      ];

      const maxPayment = 60;

      const expected = [
        [
          {
            balance: 150,
            interest: 1.52,
            month: "Oct 2019"
          },
          {
            balance: 91.52,
            interest: 0.84,
            month: "Nov 2019"
          },
          {
            balance: 32.36,
            interest: 0.27,
            month: "Dec 2019"
          },
          {
            balance: 0,
            interest: 0,
            month: "Jan 2020"
          }
        ],
        [
          {
            debts: [
              {
                balance: 50,
                interestRate: 17,
                minimumPayment: 20,
                name: "My Visa",
                type: DEBT_TYPES.CREDIT_CARD
              },
              {
                balance: 100,
                interestRate: 10,
                minimumPayment: 25,
                name: "My MasterCard",
                type: DEBT_TYPES.CREDIT_CARD
              }
            ],
            month: "Oct 2019"
          },
          {
            debts: [
              {
                balance: 15.700000000000003,
                interestRate: 17,
                minimumPayment: 20,
                name: "My Visa",
                type: DEBT_TYPES.CREDIT_CARD
              },
              {
                balance: 75.82,
                interestRate: 10,
                minimumPayment: 25,
                name: "My MasterCard",
                type: DEBT_TYPES.CREDIT_CARD
              }
            ],
            month: "Nov 2019"
          },
          {
            debts: [
              {
                balance: 0,
                interestRate: 17,
                minimumPayment: 0,
                name: "My Visa",
                type: DEBT_TYPES.CREDIT_CARD
              },
              {
                balance: 32.36,
                interestRate: 10,
                minimumPayment: 25,
                name: "My MasterCard",
                type: DEBT_TYPES.CREDIT_CARD
              }
            ],
            month: "Dec 2019"
          }
        ]
      ];

      expect(
        getPayoffProjections(sampleData, maxPayment, Date.now())
      ).toStrictEqual(expected);
    });
  });
});
