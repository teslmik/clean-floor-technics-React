import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { IRatesItem } from "./types";

export const fetchRates = createAsyncThunk<
  IRatesItem[],
  void,
  { state: RootState }
>("rates/fetchRatesStatus", async () => {
  const { data } = await axios.get<IRatesItem[]>(
    `${process.env.REACT_APP_FETCH_URL}/rates`
  );
  return data;
});
