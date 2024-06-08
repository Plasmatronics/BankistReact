export default function fetchCurrentDate() {
  const currentDate = String(new Date()).slice(4, 15);
  const currentDateFormatted =
    currentDate.substring(0, 6) + "," + currentDate.substring(6, 18);
  return currentDateFormatted;
}
