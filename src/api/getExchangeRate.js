
const url = "https://api.currencyfreaks.com";
const devApiKey = "e1a1dceede534ac2bcaea59f2db4ceef";

export const getExchangeRate = async (setRates, setIsLoading) => {
  try {
    const response = await fetch(`${url}/latest?apikey=${devApiKey}`);
    const jsonRes = await response.json();
    setRates(jsonRes.rates);
    setIsLoading(false)
  } catch (error) {
    console.log(error);
  }
};
