import React, { useEffect, useState } from "react";
import { useClient } from "sanity";

type monoRatesType = {
  currencyCodeA: number;
  currencyCodeB: number;
  rateSell: number;
  date: number;
  rateBuy: number;
};

export const UpdateRateButton = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState<any | null>(null);
  const client = useClient({ apiVersion: "2023-01-01" });

  const fetchEuroRate = async (): Promise<number | null> => {
    try {
      const response = await fetch("https://api.monobank.ua/bank/currency");
      const data: monoRatesType[] | { errText: string } = await response.json();
      const euroRate = Array.isArray(data)
        ? data.find(
            (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980,
          )
        : null;
      if (!euroRate) {
        console.log({ data });

        setError((data as { errText: string }).errText);
        throw new Error((data as { errText: string }).errText);
      }

      return euroRate ? euroRate.rateSell : null;
    } catch (error) {
      console.error("Error fetching euro rate:", JSON.stringify(error));
      return null;
    }
  };

  useEffect(() => {
    setError(null);
    const updateRate = async () => {
      const euroRate = await fetchEuroRate();
      if (euroRate !== null) {
        setRate(euroRate);

        const configDoc = await client.fetch('*[_type == "config"][0]');
        if (configDoc) {
          await client
            .patch(configDoc._id)
            .set({ "rates.bankRate": `${euroRate} €` })
            .commit();
        }
      }
    };

    updateRate();
  }, []);

  return (
    <div ref={ref}>
      {!error &&
        (rate ? (
          <p style={{ padding: "20px" }}>Курс евро обновлен: {rate} €</p>
        ) : (
          <p>Загрузка курса...</p>
        ))}
      {error && (
        <p style={{ padding: "20px" }}>{`${error}, please try again later`}</p>
      )}
    </div>
  );
});
