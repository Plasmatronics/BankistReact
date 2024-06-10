import { useEffect, useState } from "react";
import "../CSS Files/App.css";
import getInitials from "../Helper Functions/getInitials.js";
// prettier-ignore
import {account1, account2, account3, account4, account5, accounts} from "../Default Data/database.js";
import { Main } from "./Main.js";

export default function App() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [allAccounts, setAllAccounts] = useState(accounts);

  function fetchUserObject(enteredInitials) {
    if (!enteredInitials) return;
    const existingUsers = allAccounts.map((account) => account.owner);
    const existingUsersInitials = existingUsers.map((user) =>
      getInitials(user)
    );

    const enteredInitialsIndex = existingUsersInitials.findIndex(
      (initials) => initials === enteredInitials
    );
    return accounts.at(enteredInitialsIndex);
  }

  function checkUser(enteredUsername) {
    //  initializing variables//
    const existingInitials = [];

    //   converting username parameter to initials
    const enteredUsernameInitials = getInitials(enteredUsername);
    setUsername(enteredUsernameInitials);

    // getting initials of every current user
    allAccounts.map((account) =>
      existingInitials.push(getInitials(account.owner))
    );

    // checking the username's initials against existing initials
    return existingInitials.some(
      (existingInitial) => existingInitial === enteredUsernameInitials
    );
  }

  function checkPin(enteredPin) {
    // initializing variables and settingPin
    const existingPins = [];
    setPin(Number(enteredPin));

    // getting pin of every current user
    accounts.map((account) => {
      existingPins.push(account.pin);
    });

    // comparing entered pin to existingPins
    return existingPins.some(
      (existingPin) => existingPin === Number(enteredPin)
    );
  }

  useEffect(
    function handleLogoutTimer() {
      let currentInterval;
      if (isLoggedIn)
        currentInterval = setInterval(
          () => setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1),
          1000
        );
      if (secondsLeft === 0) setIsLoggedIn(false);

      return () => clearInterval(currentInterval);
    },
    [isLoggedIn, secondsLeft]
  );

  function checkCredentials(enteredUsername, enteredPin) {
    if (checkUser(enteredUsername) && checkPin(enteredPin)) {
      setIsLoggedIn(true);
      setSecondsLeft(300);
    }
    if (!(checkUser(enteredUsername) && checkPin(enteredPin)))
      setIsLoggedIn(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    const enteredUsername = e.target.username.value;
    const enteredPin = e.target.pin.value;
    checkCredentials(enteredUsername, enteredPin);
  }

  return (
    <>
      <nav>
        <p className="welcome">
          {isLoggedIn
            ? `Welcome, ${fetchUserObject(username).owner.split(" ").shift()}`
            : "Log In to See Your Funds"}
        </p>
        <img src="logo.png" alt="Bankist Logo" className="logo" />
        <form className="login" onSubmit={(e) => handleLogin(e)}>
          <input
            name="username"
            type="text"
            placeholder="user"
            className="login__input login__input--user"
          />
          <input
            name="pin"
            type="text"
            placeholder="PIN"
            maxLength="4"
            className="login__input login__input--pin"
          />
          <button className="login__btn">&rarr;</button>
        </form>
      </nav>
      <Main
        isLoggedIn={isLoggedIn}
        username={username}
        fetchUserObject={fetchUserObject}
        setIsLoggedIn={setIsLoggedIn}
        secondsLeft={secondsLeft}
        pin={pin}
        allAccounts={allAccounts}
        setAllAccounts={setAllAccounts}
      />
    </>
  );
}
