import {
  render,
  screen,
  fireEvent,
  userEvent,
  within,
} from "@testing-library/react";
import CurrencyExchange from "../CurrencyExchange";

const mockInitialCurrencyList = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
];

describe("CurrencyExchange", () => {
  it("should render CurrencyExchange component with initial currency list", () => {
    render(<CurrencyExchange initialCurrencyList={mockInitialCurrencyList} />);

    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("From")).toBeInTheDocument();
    expect(screen.getByText("To")).toBeInTheDocument();
  });

  it("should handle amount input change", () => {
    render(<CurrencyExchange initialCurrencyList={mockInitialCurrencyList} />);

    const amountInput = screen.getByPlaceholderText("0.0");
    fireEvent.change(amountInput, { target: { value: "5.0" } });

    expect(amountInput.value).toBe("5.0");
  });
});
