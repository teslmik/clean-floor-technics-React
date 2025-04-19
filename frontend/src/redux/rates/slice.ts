import { createSlice } from "@reduxjs/toolkit";

import { fetchRates } from "./asyncActions";
import { IRatesSliceState, Status } from "./types";

const initialState: IRatesSliceState = {
  items: { rate: null, bankRate: null },
  status: Status.IDLE,
};

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRates.pending, (state) => {
      state.status = Status.LOADING;
      state.items = { rate: null, bankRate: null };
    });
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchRates.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = { rate: null, bankRate: null };
    });
    // builder.addCase(editRate.pending, (state) => {
    //   state.status = Status.LOADING;
    //   state.items.rates = [];
    // });
    // builder.addCase(editRate.fulfilled, (state, action) => {
    //   state.items.rates = [action.payload];
    //   state.status = Status.SUCCESS;
    // });
    // builder.addCase(editRate.rejected, (state) => {
    //   state.status = Status.ERROR;
    //   state.items.rates = [];
    // });
  },
});

export default ratesSlice.reducer;
