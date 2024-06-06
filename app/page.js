import CurrencyExchange from "./CurrencyExchange";

import { ConfigProvider } from "antd";
import "./assets/app.scss";

export default function Home() {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <CurrencyExchange />
    </ConfigProvider>
  );
}
