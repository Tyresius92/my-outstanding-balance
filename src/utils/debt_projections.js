import { DEBT_TYPES } from "./debt_constants";
import { addMonths, getFormattedChartLabelDate } from "./date_utils";
import { normalizeNumber } from "./number_utils";

export const isLastIndex = (array, currentInd) =>
  array.length === currentInd + 1;

export const getTotalBalance = debts =>
  debts.reduce((acc, curr) => acc + curr.balance, 0);

export const getAvalancheSortedDebts = debts =>
  [...debts].sort(
    (a, b) =>
      a.interestRate > b.interestRate ||
      (a.interestRate === b.interestRate && a.balance < b.balance)
  );

export const getSnowballSortedDebts = debts =>
  [...debts].sort((a, b) => a.balance > b.balance);

export const getExtraPaymentAmount = (balance, availableAmount) =>
  Math.min(balance, availableAmount);

export const getMonthlyInterestCharge = (balance, interestRate, debtType) => {
  switch (debtType) {
    case DEBT_TYPES.STUDENT_LOAN:
      return getMonthlyStudentLoanInterestCharge(balance, interestRate);
    case DEBT_TYPES.CREDIT_CARD:
    default:
      return getMonthlyCreditCardInterestCharge(balance, interestRate);
  }
};

export const getMonthlyCreditCardInterestCharge = (balance, interestRate) => {
  const PERCENT_DIVISOR = 100;
  const DAYS_PER_YEAR = 365;
  const DAYS_PER_MONTH = 30;

  const DIGITS_AFTER_DECIMAL = 2;

  const decimalInterestRate = interestRate / PERCENT_DIVISOR;
  const dailyInterestRate = decimalInterestRate / DAYS_PER_YEAR;
  const monthlyInterestRate = dailyInterestRate * DAYS_PER_MONTH;
  const interestCharge = balance * monthlyInterestRate;

  return normalizeNumber(interestCharge, DIGITS_AFTER_DECIMAL);
};

export const getMonthlyStudentLoanInterestCharge = (balance, interestRate) => {
  const PERCENT_DIVISOR = 100;
  const DAYS_PER_YEAR = 365;
  const DAYS_PER_MONTH = 30;

  const DIGITS_AFTER_DECIMAL = 2;

  const decimalInterestRate = interestRate / PERCENT_DIVISOR;
  const dailyInterestRate = decimalInterestRate / DAYS_PER_YEAR;
  const monthlyInterestRate = dailyInterestRate * DAYS_PER_MONTH;
  const interestCharge = balance * monthlyInterestRate;

  return normalizeNumber(interestCharge, DIGITS_AFTER_DECIMAL);
};

export const getDebtsAfterInterestApplied = debts =>
  [...debts].map(debt => ({
    ...debt,
    balance:
      debt.balance +
      getMonthlyInterestCharge(debt.balance, debt.interestRate, debt.type)
  }));

export const getDebtsAfterMinimums = debts => {
  const results = debts.reduce(
    (acc, debt) => {
      const paymentAmount = Math.min(debt.balance, debt.minimumPayment);
      acc.debts = [
        ...acc.debts,
        {
          ...debt,
          balance: debt.balance - paymentAmount,
          minimumPayment:
            paymentAmount === debt.balance ? 0 : debt.minimumPayment
        }
      ];
      acc.amountPaid += paymentAmount;
      return acc;
    },
    {
      debts: [],
      amountPaid: 0
    }
  );

  return [results.debts, results.amountPaid];
};

const getDebtsAfterPayingAmountOnDebtAtIndex = (debts, amount, index) => {
  const thisDebt = debts[index];

  const paymentAmount = getExtraPaymentAmount(thisDebt.balance, amount);

  thisDebt.balance -= paymentAmount;

  thisDebt.minimumPayment =
    thisDebt.balance === 0 ? 0 : thisDebt.minimumPayment;

  return [debts, amount - paymentAmount];
};

export const getDebtsAfterPayments = (inputDebts, paymentAmount) => {
  const [debtsMinusMinimums, amountPaid] = getDebtsAfterMinimums(inputDebts);
  let remainingAmount = paymentAmount - amountPaid;
  let debts = debtsMinusMinimums;
  while (remainingAmount > 0 && getTotalBalance(debts) !== 0) {
    const priorityDebtIndex = getIndexOfHighestInterestDebtWithBalance(debts);
    [debts, remainingAmount] = getDebtsAfterPayingAmountOnDebtAtIndex(
      debts,
      remainingAmount,
      priorityDebtIndex
    );
  }

  return debts;
};

export const getIndexOfHighestInterestDebtWithBalance = debts => {
  let result = 0;
  for (let i = 0; i < debts.length; i++) {
    if (
      debts[result].balance === 0 || // skip, this isn't the one we want
      (debts[i].balance !== 0 &&
        debts[i].interestRate > debts[result].interestRate)
    ) {
      result = i;
    }
  }

  return result;
};

const constructProjection = (monthLabel, endingBalance, interestCharge) => ({
  month: monthLabel,
  balance: endingBalance,
  interest: endingBalance === 0 ? 0 : interestCharge
});

export const getPayoffProjections = (debts, payment, startDate) => {
  let debtsCopy = debts;
  let projectedBalances = [];
  let projections = [];

  let elapsedMonths = 0;
  while (getTotalBalance(debtsCopy) > 0) {
    projectedBalances = [
      ...projectedBalances,
      {
        month: getFormattedChartLabelDate(addMonths(startDate, elapsedMonths)),
        debts: debtsCopy
      }
    ];

    const totalMonthlyInterestCharge = debtsCopy.reduce(
      (acc, { balance, interestRate, type }) =>
        acc + getMonthlyInterestCharge(balance, interestRate, type),
      0
    );

    const endingBalance = getTotalBalance(debtsCopy);

    projections = [
      ...projections,
      constructProjection(
        getFormattedChartLabelDate(addMonths(startDate, elapsedMonths)),
        endingBalance,
        totalMonthlyInterestCharge
      )
    ];

    debtsCopy = debtsCopy.map(debt => ({
      ...debt,
      balance:
        debt.balance +
        getMonthlyInterestCharge(debt.balance, debt.interestRate, debt.type)
    }));

    debtsCopy = getDebtsAfterPayments(debtsCopy, payment);

    elapsedMonths++;
  }

  projections = [
    ...projections,
    {
      month: getFormattedChartLabelDate(addMonths(startDate, elapsedMonths)),
      balance: 0,
      interest: 0
    }
  ];

  return [projections, projectedBalances];
};
