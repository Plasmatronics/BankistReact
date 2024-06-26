import { useState } from "react";
import daysPassed from "../Helper Functions/daysPassed.js";
import { LogoutTimer } from "./LogoutTimer.js";
import { Operations } from "./Operations.js";
import { Summary } from "./Summary.js";
import { Movements } from "./Movements.js";

export function Main({
  isLoggedIn,
  username,
  fetchUserObject,
  setIsLoggedIn,
  secondsLeft,
  pin,
  allAccounts,
  setAllAccounts,
}) {
  const [sort, setSort] = useState(0);
  const [currentMovements, setCurrentMovements] = useState(
    fetchUserObject(username)?.movements
  );

  function calculateBalance(username) {
    const accountOwnerObject = fetchUserObject(username);
    const userMovements = accountOwnerObject.movements;
    const userMovementsNumbers = userMovements.map((movement) =>
      Number(movement)
    );

    return userMovementsNumbers
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      .toFixed(2);
  }

  function displayMovementDates(movement) {
    //   creating todays date and formatting it
    const currentDate = new Date();
    const currentDateUnformatted = new Intl.DateTimeFormat("en-US")
      .format(currentDate)
      .replaceAll("/", "-");
    const currentDateUnformattedMonths = currentDateUnformatted
      .slice(0, currentDateUnformatted.indexOf("-"))
      .padStart(2, "0");
    const currentDateUnformattedDays = currentDateUnformatted
      .slice(
        currentDateUnformatted.indexOf("-") + 1,
        currentDateUnformatted.lastIndexOf("-")
      )
      .padStart(2, "0");
    const currentDateUnformattedYear = currentDateUnformatted.slice(-4);

    // final current date formatting step
    const currentDateFormatted =
      currentDateUnformattedMonths +
      "-" +
      currentDateUnformattedDays +
      "-" +
      currentDateUnformattedYear;

    // finding the movement value's index and thens selecting the date off that index
    const movementIndex = fetchUserObject(username).movements.indexOf(movement);
    console.log(movementIndex);
    const currentMovementDate =
      fetchUserObject(username).movementDates[movementIndex];

    //how many days have passed since the current movement
    const daysSince =
      daysPassed(currentDateFormatted) - daysPassed(currentMovementDate);
    // if more than 3 day ago, just print the date
    if (daysSince === 0) return "Today";
    if (daysSince === 1) return "Yesterday";
    if (daysSince === 2) return "1 Day Ago";
    if (daysSince === 3) return "2 Days Ago";
    if (daysSince === 4) return "3 Days Ago";
    if (daysSince > 4) return currentMovementDate;
  }

  return (
    <>
      {/* <!-- BALANCES --> */}
      {isLoggedIn && (
        <main className="app" style={{ opacity: 1 }}>
          <Movements
            calculateBalance={calculateBalance}
            username={username}
            sort={sort}
            currentMovements={currentMovements}
            displayMovementDates={displayMovementDates}
            fetchUserObject={fetchUserObject}
            setCurrentMovements={setCurrentMovements}
          />

          <Summary
            username={username}
            calculateBalance={calculateBalance}
            setSort={setSort}
            fetchUserObject={fetchUserObject}
          />
          <Operations
            setCurrentMovements={setCurrentMovements}
            username={username}
            calculateBalance={calculateBalance}
            setSort={setSort}
            pin={pin}
            setIsLoggedIn={setIsLoggedIn}
            displayMovementDates={displayMovementDates}
            allAccounts={allAccounts}
            setAllAccounts={setAllAccounts}
            fetchUserObject={fetchUserObject}
          />
          <LogoutTimer secondsLeft={secondsLeft} />
        </main>
      )}
    </>
  );
}
