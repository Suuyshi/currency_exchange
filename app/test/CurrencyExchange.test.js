import { render, screen, fireEvent } from "@testing-library/react";
import CurrencyExchange from "../CurrencyExchange";

const mockInitialCurrencyList = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
];

describe("CurrencyExchange", () => {
  //   it("should render CurrencyExchange component with initial currency list", () => {
  //     render(<CurrencyExchange initialCurrencyList={mockInitialCurrencyList} />);

  //     expect(screen.getByText("Amount")).toBeInTheDocument();
  //     expect(screen.getByText("From")).toBeInTheDocument();
  //     expect(screen.getByText("To")).toBeInTheDocument();
  //   });

  it("should handle amount input change", () => {
    render(<CurrencyExchange initialCurrencyList={mockInitialCurrencyList} />);

    const amountInput = screen.getByPlaceholderText("0.0");
    fireEvent.change(amountInput, { target: { value: "5.0" } });

    expect(amountInput.value).toBe("5.0");
  });

  //   it("should handle currency selection", () => {
  //     render(<CurrencyExchange initialCurrencyList={mockInitialCurrencyList} />);

  //     const fromCurrencySelect = screen.getAllByRole("select-curr1")[1];
  //     fireEvent.change(fromCurrencySelect, { target: { value: "USD" } });

  //     expect(fromCurrencySelect.value).toBe("USD");
  //   });

  //   it("should handle reset", () => {
  //     render(<CurrencyExchange initialCurrencyList={mockInitialCurrencyList} />);

  //     const fromCurrencySelect = screen.getAllByRole("select-curr1")[1];
  //     fireEvent.change(fromCurrencySelect, {
  //       target: { value: "USD", label: "USD" },
  //     });
  //     const toCurrencySelect = screen.getAllByRole("select-curr2")[1];
  //     fireEvent.change(toCurrencySelect, {
  //       target: { value: "EUR", label: "EUR" },
  //     });
  //     const resetButton = screen.getByText("Reset");
  //     fireEvent.click(resetButton);
  //   });
});
