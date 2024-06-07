"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

//Constants
import {
  LIST_CURR_URL,
  RAPID_API_KEY,
  RAPID_HOST,
  generateExchangeURL,
} from "./constants/currency-exchange-api";

//Components
import { Select, InputNumber, Spin } from "antd";
import CurrencyExIcon from "./assets/icons/CurrencyExIcon";
import bg from "./BG.jpg";

const CurrencyExchange = ({ initialCurrencyList }) => {
  const [amountValue, setAmountValue] = useState(1.0);
  const [resultValue, setResultValue] = useState("");
  const [resultLoading, setResultLoading] = useState(false);
  const [currencyList, setCurrencyList] = useState(initialCurrencyList);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState(null);
  const [selectedToCurrency, setSelectedToCurrency] = useState(null);
  const debounceTimer = useRef(null);

  const handleChangeAmount = (value) => {
    setAmountValue(value === "" || value === null ? 0.0 : value);
  };

  const getCurrencyOptions = useCallback((list, disabledValue) => {
    return list.map((item) => ({
      ...item,
      disabled: item.value === disabledValue,
    }));
  }, []);

  const handleSelectFromCurrency = (value) => {
    setSelectedFromCurrency(value);
  };

  const handleSelectToCurrency = (value) => {
    setSelectedToCurrency(value);
  };

  const handleSwapCurrency = () => {
    setSelectedFromCurrency(selectedToCurrency);
    setSelectedToCurrency(selectedFromCurrency);
  };

  const fetchExchangeRate = useCallback(async () => {
    if (!selectedFromCurrency || !selectedToCurrency) return;

    setResultLoading(true);
    const url = generateExchangeURL(
      selectedFromCurrency,
      selectedToCurrency,
      amountValue
    );
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_HOST,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      setResultValue(
        `${amountValue} ${selectedFromCurrency} equals ${
          (+result).toFixed(4) * amountValue
        } ${selectedToCurrency}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setResultLoading(false);
    }
  }, [selectedFromCurrency, selectedToCurrency, amountValue]);

  const debouncedFetchExchangeRate = useCallback(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchExchangeRate();
    }, 2000);
  }, [fetchExchangeRate]);

  useEffect(() => {
    debouncedFetchExchangeRate();

    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [debouncedFetchExchangeRate]);

  const handleReset = () => {
    setAmountValue(1.0);
    setSelectedFromCurrency(null);
    setSelectedToCurrency(null);
    setResultValue("");
  };

  return (
    <main
      className="main-container"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="inner-container">
        <div className="inner-container__content">
          <div className="inner-container__header">Money Exchange</div>
          <div className="inner-container__card">
            <div className="inner-container__card-content">
              <div className="inner-container__field-style">
                Amount
                <InputNumber
                  type="number"
                  style={{ width: 300 }}
                  value={amountValue}
                  defaultValue={1.0}
                  placeholder="0.0"
                  precision={1}
                  step={0.1}
                  stringMode
                  onChange={handleChangeAmount}
                  parser={(value) => {
                    const parsedValue = parseFloat(value);
                    return isNaN(parsedValue) ? 0 : parsedValue;
                  }}
                />
              </div>
              <div className="inner-container__field-style">
                From
                <Select
                  placeholder="Currency"
                  options={getCurrencyOptions(currencyList, selectedToCurrency)}
                  value={selectedFromCurrency}
                  onChange={handleSelectFromCurrency}
                  role="select-curr1"
                />
              </div>
              <button
                className="inner-container__btn-style"
                onClick={handleSwapCurrency}
              >
                <CurrencyExIcon />
              </button>
              <div className="inner-container__field-style">
                To
                <Select
                  placeholder="Currency"
                  options={getCurrencyOptions(
                    currencyList,
                    selectedFromCurrency
                  )}
                  value={selectedToCurrency}
                  onChange={handleSelectToCurrency}
                  role="select-curr2"
                />
              </div>
            </div>
            {amountValue && selectedFromCurrency && selectedToCurrency && (
              <div className="inner-container__reset-btn-container">
                <button
                  className="inner-container__reset-btn-container--resetbtn"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
            {resultLoading ? (
              <div className="inner-container__result-container">
                <Spin />
              </div>
            ) : (
              <div className="inner-container__result-container">
                {resultValue}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(CurrencyExchange);
