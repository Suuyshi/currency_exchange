import CurrencyExchange from "./CurrencyExchange";
import {
  LIST_CURR_URL,
  RAPID_API_KEY,
  RAPID_HOST,
} from "./constants/currency-exchange-api";
import { ConfigProvider } from "antd";
import "./assets/app.scss";

export async function fetchCurrencyData() {
  const url = LIST_CURR_URL;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_HOST,
    },
  };

  let initialCurrencyList = [];

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    initialCurrencyList = result.map((item) => ({ label: item, value: item }));
  } catch (error) {
    console.error(error);
  }

  return initialCurrencyList;
}

export default async function Page() {
  const initialCurrencyList = await fetchCurrencyData();

  return (
    <ConfigProvider theme={{ hashed: false }}>
      <CurrencyExchange initialCurrencyList={initialCurrencyList} />
    </ConfigProvider>
  );
}
