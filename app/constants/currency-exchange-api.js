export const RAPID_API_KEY =
  "cb99e43469mshefe8cd0fcaec014p173bd9jsn1524d9fa24e5";
export const RAPID_HOST = "currency-exchange.p.rapidapi.com";

export const LIST_CURR_URL =
  "https://currency-exchange.p.rapidapi.com/listquotes";

export const generateExchangeURL = (
  selectedFromCurrency,
  selectedToCurrency,
  amountValue
) => {
  const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${selectedFromCurrency}&to=${selectedToCurrency}&q=${amountValue}`;
  return url;
};
