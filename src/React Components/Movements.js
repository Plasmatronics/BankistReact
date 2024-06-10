import { useState, useEffect } from "react";
import fetchCurrentDate from "../Helper Functions/fetchCurrentDate.js";

export function Movements({
  calculateBalance,
  username,
  sort,
  currentMovements,
  setCurrentMovements,
  displayMovementDates,
  fetchUserObject,
}) {
  const userMovements = fetchUserObject(username).movements;

  useEffect(() => {
    const movementsCopy = [...userMovements];
    if (sort === 0) setCurrentMovements(...movementsCopy);
    if (sort === 1) movementsCopy.sort((a, b) => a - b);
    if (sort === 2) movementsCopy.sort((a, b) => b - a);
    setCurrentMovements(movementsCopy);
  }, [username, sort, currentMovements]);

  return (
    <>
      <div className="balance">
        <div>
          <p className="balance__label">Activity</p>
          <p className="balance__date">
            As of <span className="date">{fetchCurrentDate()}</span>
          </p>
        </div>
        <p className="balance__value">${calculateBalance(username)}</p>
      </div>

      <div className="movements">
        {currentMovements?.map((value, index) =>
          value > 0 ? (
            <div className="movements__row" key={index}>
              <div className="movements__type movements__type--deposit">
                Deposit
              </div>
              <div className="movements__date">
                {displayMovementDates(value)}
              </div>
              <div className="movements__value">${value}</div>
            </div>
          ) : (
            <div className="movements__row" key={index}>
              <div className="movements__type movements__type--withdrawal">
                Withdrawal
              </div>
              <div className="movements__date">
                {displayMovementDates(value)}
              </div>
              <div className="movements__value">-${Math.abs(value)}</div>
            </div>
          )
        )}
      </div>
    </>
  );
}
