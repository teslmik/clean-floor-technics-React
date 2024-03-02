import { createSlice } from "@reduxjs/toolkit";

import { fetchRates } from "./asyncActions";
import { IRatesSliceState, Status } from "./types";

const initialState: IRatesSliceState = {
  items: { rates: [], bankEuro: null },
  status: Status.LOADING,
};

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRates.pending, (state) => {
      state.status = Status.LOADING;
      state.items = { rates: [], bankEuro: null };
    });
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchRates.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = { rates: [], bankEuro: null };
    });
  },
});

export default ratesSlice.reducer;
