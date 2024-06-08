export default function monthToDays(month) {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth
    .slice(0, month + 1)
    .reduce((totalDays, currentMonth) => totalDays + currentMonth, 0);
}
