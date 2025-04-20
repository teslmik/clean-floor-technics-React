import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "@cms/lib/sanitiClient";
import { RootState } from "../store";

export const fetchRates = createAsyncThunk<
  { rate: number; bankRate: string },
  void,
  { state: RootState }
>("rates/fetchRatesStatus", async () => {
  const { rates } = await client.fetch<{
    rates: { rate: number; bankRate: string };
  }>(`*[_type == "config"][0] { rates }`);

  return rates;
});
