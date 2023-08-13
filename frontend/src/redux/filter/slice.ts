import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilterSliceState, SortPropertyEnum, SortTypeState } from './types';

const initialState: IFilterSliceState = {
  filterState: [],
  sortState: { name: 'по популярності', sortProperty: SortPropertyEnum.RATING },
}

export const filterSlice = createSlice({
  name: 'filters',
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