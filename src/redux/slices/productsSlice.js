import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducstStatus', async (_, thunkAPI) => {
  const { sortState } = thunkAPI.getState().filter;
  const order = sortState === 'rating' ? 'desc' : 'asc';
  const { data } = await axios
    .get(`https://636e34f8b567eed48ad655d0.mockapi.io/products?sortBy=${sortState.sortProperty}&order=${order}`);
  return data;
});

const initialState = {
  items: [],
  status: 'loading' //loading | success | error 
}

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  }
});

export const productsSelector = (state) => state.products;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;