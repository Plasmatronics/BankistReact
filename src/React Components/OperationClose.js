import getInitials from "../Helper Functions/getInitials.js";
import { accounts } from "../Default Data/database.js";

export function OperationClose({
  username,
  allAccounts,
  setIsLoggedIn,
  setAllAccounts,
  pin,
}) {
  function deleteAccount(user, enteredPin) {
    if (user.replaceAll(" ", "") !== username || Number(enteredPin) !== pin)
      return;
    const existingUsers = accounts.map((account) => account.owner);
    const existingUsersInitials = existingUsers.map((existingUser) =>
      getInitials(existingUser)
    );

    const closingUserIndex = existingUsersInitials.findIndex(
      (initials) => initials === user
    );
    setIsLoggedIn(false);

    const updatedAccounts = allAccounts.filter((_, index) => {
      return index !== closingUserIndex;
    });
    return setAllAccounts(updatedAccounts);
  }

  function handleAccountClosure(e) {
    e.preventDefault();
    const confirmUser = e.target.confirmUser.value.toLowerCase();
    const confirmPin = e.target.confirmPin.value;
    return deleteAccount(confirmUser, confirmPin);
  }
  return (
    <div className="operation operation--close">
      <h2>Close Account</h2>
      <form
        className="form form--close"
        onSubmit={(e) => handleAccountClosure(e)}
      >
        <input
          type="text"
          className="form__input form__input--user"
          name="confirmUser"
        />
        <input
          name="confirmPin"
          type="password"
          maxLength="4"
          className="form__input form__input--pin"
        />
        <button className="form__btn form__btn--close">&rarr;</button>
        <label className="form__label">Confirm User</label>
        <label className="form__label">Confirm PIN</label>
      </form>
    </div>
  );
}
