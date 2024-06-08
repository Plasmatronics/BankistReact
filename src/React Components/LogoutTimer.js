import secondsToMinutes from "../Helper Functions/secondsToMinutes.js";

export function LogoutTimer({ secondsLeft }) {
  return (
    <p className="logout-timer">
      You will be logged out in{" "}
      <span className="timer">{secondsToMinutes(secondsLeft)}</span>
    </p>
  );
}
