import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterState: [],
  sortState: { name: 'по популярності', sortProperty: 'rating' },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filterState = action.payload;
    },
    setSort(state, action) {
      state.sortState = action.payload;
    },
  },
});

export const filterSelector = state => state.filter;

export const { setFilter, setSort } = filterSlice.actions;

export default filterSlice.reducer;