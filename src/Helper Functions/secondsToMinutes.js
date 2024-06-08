export default function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = String(Math.ceil((seconds / 60 - minutes) * 60));
  const displaySeconds =
    secondsLeft >= 10 ? secondsLeft : secondsLeft.padStart(2, 0);
  const displayTimer = `${minutes}:${displaySeconds}`;
  return displayTimer;
}
