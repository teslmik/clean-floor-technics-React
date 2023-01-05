import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortTypeState = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
}

export interface IFilterSliceState {
  filterState: string[],
  sortState: SortTypeState,
}

const initialState: IFilterSliceState = {
  filterState: [],
  sortState: { name: 'по популярності', sortProperty: 'rating' },
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

export const filterSelector = (state: RootState) => state.filter;

export const { setFilter, setSort } = filterSlice.actions;

export default filterSlice.reducer;