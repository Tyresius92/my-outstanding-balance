export const addMonths = (inputDate, elapsedMonths) => {
  const now = new Date(inputDate);

  const dateOfMonth = now.getDate();
  now.setMonth(now.getMonth() + elapsedMonths);
  if (now.getDate() !== dateOfMonth) {
    now.setDate(0);
  }
  return now.getTime();
};

export const getFormattedChartLabelDate = date => {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  const dateObj = new Date(date);

  const month = MONTHS[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${month} ${year}`;
};
