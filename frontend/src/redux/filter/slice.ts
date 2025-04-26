import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUrlParams } from "@src/utils/urlParams";

import { IFilterSliceState, SortTypeState } from "./types";

const { filters, sortState } = getUrlParams();

const initialState: IFilterSliceState = {
  filterState: filters,
  sortState,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string[]>) {
      state.filterState = action.payload;
    },
    setSort(state, action: PayloadAction<SortTypeState>) {
      state.sortState = action.payload;
    },
  },
});

export const { setFilter, setSort } = filterSlice.actions;

export default filterSlice.reducer;
