export const normalizeNumber = (num, specificity) =>
  parseFloat(parseFloat(num).toFixed(specificity));
