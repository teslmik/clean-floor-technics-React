import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { IRatesItem } from "./types";

export const fetchRates = createAsyncThunk<
  {
    rates: IRatesItem[];
    bankEuro: {
      currencyCodeA: number;
      currencyCodeB: number;
      rateSell: number;
      date: number;
      rateBuy: number;
    };
  },
  void,
  { state: RootState }
>("rates/fetchRatesStatus", async () => {
  const { data } = await axios.get<{
    rates: IRatesItem[];
    bankEuro: {
      currencyCodeA: number;
      currencyCodeB: number;
      rateSell: number;
      date: number;
      rateBuy: number;
    };
  }>(`${process.env.REACT_APP_FETCH_URL}/rates`);
  return data;
});
