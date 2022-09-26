import React from "react";

import "./ExchangeRate.css";

const ExchangeRate = ({
  amount,
  currency,
  currencies,
  handleAmountChange,
  handleCurrencyChange,
}) => (
  <div className="wrapper">
    <input
      type="text"
      value={amount}
      onChange={(e) => handleAmountChange(e.target.value)}
    />
    <select
      value={currency}
      onChange={(e) => handleCurrencyChange(e.target.value)}
    >
      {currencies.map((currency, idx) => (
        <option key={idx} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
);

export default ExchangeRate;
