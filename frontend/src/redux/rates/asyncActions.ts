import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { IBankRate, IRatesItem } from "./types";

export const fetchRates = createAsyncThunk<
  {
    rates: IRatesItem[];
    bankEuro: IBankRate;
  },
  void,
  { state: RootState }
>("rates/fetchRatesStatus", async () => {
  const { data } = await axios.get<{
    rates: IRatesItem[];
    bankEuro: IBankRate;
  }>(`${process.env.REACT_APP_FETCH_URL}/rates`);
  return data;
});

export const editRate = createAsyncThunk<
  IRatesItem,
  { currency: string; value: number | string },
  { state: RootState }
>("product/editProducts", async ({ currency, value }) => {
  const { data } = await axios.put<IRatesItem>(
    `${process.env.REACT_APP_FETCH_URL}/rates`,
    { currency, value }
  );
  return data;
});
