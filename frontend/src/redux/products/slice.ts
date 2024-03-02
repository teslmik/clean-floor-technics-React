import { createSlice } from "@reduxjs/toolkit";

import { fetchProducts, editProduct } from "./asyncActions";
import { IProductSliceState, Status } from "./types";

const initialState: IProductSliceState = {
  items: [],
  status: Status.LOADING,
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(editProduct.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.items.forEach((product, i) => {
        if (product._id === action.payload._id) {
          state.items[i] = action.payload;
        }
      });
      state.status = Status.SUCCESS;
    });
    builder.addCase(editProduct.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export default productsSlice.reducer;
