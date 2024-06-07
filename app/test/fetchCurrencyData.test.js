import { fetchCurrencyData } from "../page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(["USD", "EUR"]),
  })
);

describe("fetchCurrencyData", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should fetch currency data and return the formatted list", async () => {
    const data = await fetchCurrencyData();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual([
      { label: "USD", value: "USD" },
      { label: "EUR", value: "EUR" },
    ]);
  });
});
