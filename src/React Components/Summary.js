export function Summary({
  username,
  calculateBalance,
  setSort,
  fetchUserObject,
}) {
  function handleSetSort() {
    setSort((prevSortValue) => (prevSortValue < 2 ? prevSortValue + 1 : 0));
  }

  function fetchDeposits() {
    let incoming = fetchUserObject(username)
      .movements.filter((value) => value > 0)
      .reduce((totalDeposits, movement) => totalDeposits + movement, 0);

    return incoming.toFixed(2);
  }

  function fetchWithdrawals() {
    let outgoing = fetchUserObject(username)
      .movements.filter((value) => value < 0)
      .reduce((totalWithdrawals, movement) => totalWithdrawals + movement, 0);

    return Math.abs(outgoing).toFixed(2);
  }

  function fetchInterest(username) {
    const interestRate = fetchUserObject(username).interestRate / 100;
    const balance = calculateBalance(username);

    return (balance * interestRate).toFixed(2);
  }
  return (
    <div className="summary">
      <p className="summary__label">Incoming</p>
      <p className="summary__value summary__value--in">
        ${fetchDeposits(username)}
      </p>
      <p className="summary__label">Outgoing</p>
      <p className="summary__value summary__value--out">
        ${fetchWithdrawals(username)}
      </p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">
        ${fetchInterest(username)}
      </p>
      <button className="btn--sort" onClick={handleSetSort}>
        &darr; SORT
      </button>
    </div>
  );
}
