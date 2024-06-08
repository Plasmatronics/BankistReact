export function OperationLoan({ createMovement, username, calculateBalance }) {
  function handleRequestLoan(e) {
    e.preventDefault();
    const loanAmount = e.target.loanAmount.value;
    if (loanAmount < Number(calculateBalance(username)) * 0.1) {
      createMovement(username, Number(loanAmount));
    }
  }

  return (
    <div className="operation operation--loan">
      <h2>Request a Loan</h2>
      <form className="form form--loan" onSubmit={(e) => handleRequestLoan(e)}>
        <input
          type="number"
          className="form__input form__input--loan-amount"
          name="loanAmount"
        />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  );
}
