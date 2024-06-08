import monthToDays from "./monthsToDays";

export default function daysPassed(date) {
  const leapYearsInDays = Math.trunc((Number(date?.slice(6, 10)) - 1970) / 4);
  const yearsInDays =
    (Number(date?.slice(6, 10)) - 1970) * 365 + leapYearsInDays;
  const monthsInDays = monthToDays(Number(date?.slice(0, 2)));
  const totalDays = Number(
    monthsInDays + yearsInDays + Number(date?.slice(3, 5))
  );
  return totalDays;
}
