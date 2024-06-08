import { OperationClose } from "./OperationClose.js";
import { OperationLoan } from "./OperationLoan.js";
import { OperationTransfer } from "./OperationTransfer.js";

export function Operations({
  username,
  calculateBalance,
  setCurrentMovments,
  setSort,
  pin,
  setIsLoggedIn,
  displayMovementDates,
  allAccounts,
  setAllAccounts,
  fetchUserObject,
}) {
  function createMovement(user, amount) {
    const desiredUser = fetchUserObject(user);
    const MovementsCopy = [...desiredUser.movements];
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

    if (calculateBalance(user) > Math.abs(amount)) {
      desiredUser.movementDates.unshift(currentDateFormatted);
      displayMovementDates(0);
      desiredUser.movements.unshift(amount);
      setCurrentMovments(MovementsCopy);
      setSort(0);
    }
  }

  return (
    <>
      <OperationTransfer createMovement={createMovement} username={username} />
      <OperationLoan
        createMovement={createMovement}
        username={username}
        calculateBalance={calculateBalance}
      />
      <OperationClose
        createMovement={createMovement}
        username={username}
        allAccounts={allAccounts}
        setIsLoggedIn={setIsLoggedIn}
        setAllAccounts={setAllAccounts}
        pin={pin}
      />
    </>
  );
}
