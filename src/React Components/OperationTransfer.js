export function OperationTransfer({ createMovement, username }) {
  function handleTransfer(e) {
    e.preventDefault();
    const recipient = e.target.recipient.value;
    const amount = e.target.amount.value;
    createMovement(username, -amount);
    createMovement(recipient, amount);
  }
  return (
    <div className="operation operation--transfer">
      <h2>Transfer Money</h2>
      <form
        className="form form--transfer"
        onSubmit={(e) => {
          handleTransfer(e);
        }}
      >
        <input
          type="text"
          className="form__input form__input--to"
          name="recipient"
        />
        <input
          name="amount"
          type="number"
          className="form__input form__input--amount"
        />
        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">Transfer To</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}
