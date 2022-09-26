import React, { useEffect, useState } from "react";

import { getExchangeRate } from "./api/getExchangeRate";
import ExchangeRate from "./components/ExchangeRate";

import "./App.css";

function App() {
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [firstAmount, setFirstAmount] = useState(1);
  const [secondAmount, setSecondAmount] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("UAH");

  useEffect(() => {
    getExchangeRate(setRates, setIsLoading);
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleFirstAmountChange(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates]);

  const getShortedNumber = (num) => num.toFixed(2);
  const amountCalculation = (amountVal, currencyVal1, currencyVal2) =>
    getShortedNumber((amountVal * rates[currencyVal1]) / rates[currencyVal2]);

  const handleFirstAmountChange = (firstAmount) => {
    setFirstAmount(firstAmount);
    setSecondAmount(
      amountCalculation(firstAmount, secondCurrency, firstCurrency)
    );
  };

  const handleFirstCurrencyChange = (firstCurrency) => {
    setFirstCurrency(firstCurrency);
    setSecondAmount(
      amountCalculation(firstAmount, secondCurrency, firstCurrency)
    );
  };

  const handleSecondAmountChange = (secondAmount) => {
    setSecondAmount(secondAmount);
    setFirstAmount(
      amountCalculation(secondAmount, firstCurrency, secondCurrency)
    );
  };

  const handleSecondCurrencyChange = (secondCurrency) => {
    setSecondCurrency(secondCurrency);
    setFirstAmount(
      amountCalculation(secondAmount, firstCurrency, secondCurrency)
    );
  };

  const uahToUsd = getShortedNumber(rates["UAH"] / rates["USD"]);
  const uahToEur = getShortedNumber(rates["UAH"] / rates["EUR"]);

  return (
    <>
      {!isLoading ? (
        <>
          <header>
            <h1>
              <div>Exchange rate</div>
              <div>USD: {uahToUsd}</div>
              <div>EUR: {uahToEur}</div>
            </h1>
          </header>
          <main>
            <ExchangeRate
              currencies={Object.keys(rates)}
              amount={firstAmount}
              currency={firstCurrency}
              handleAmountChange={handleFirstAmountChange}
              handleCurrencyChange={handleFirstCurrencyChange}
            />
            <ExchangeRate
              currencies={Object.keys(rates)}
              amount={secondAmount}
              currency={secondCurrency}
              handleAmountChange={handleSecondAmountChange}
              handleCurrencyChange={handleSecondCurrencyChange}
            />
          </main>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default App;
