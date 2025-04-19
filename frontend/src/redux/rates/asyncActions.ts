import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import client from "@cms/lib/sanitiClient";
import { RootState } from "../store";
import { IRatesItem } from "./types";

export const fetchRates = createAsyncThunk<
  { rate: number; bankRate: string },
  void,
  { state: RootState }
>("rates/fetchRatesStatus", async () => {
  const { rates } = await client.fetch<{
    rates: { rate: number; bankRate: string };
  }>(`*[_type == "config"][0] { rates }`);

  // const { data } = await axios.get<{
  //   rates: IRatesItem[];
  //   bankEuro: IBankRate;
  // }>(`${import.meta.env.VITE_APP_FETCH_URL}/rates`);
  return rates;
});

export const editRate = createAsyncThunk<
  IRatesItem,
  { currency: string; value: number | string },
  { state: RootState }
>("product/editProducts", async ({ currency, value }) => {
  const { data } = await axios.put<IRatesItem>(
    `${import.meta.env.VITE_APP_FETCH_URL}/rates`,
    { currency, value },
  );
  return data;
});
