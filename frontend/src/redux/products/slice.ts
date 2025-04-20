import { createSlice } from "@reduxjs/toolkit";

import { fetchSanityProducts, fetchSanityPromoProducts } from "./asyncActions";
import { IProductSliceState, Status } from "./types";

const initialState: IProductSliceState = {
  items: { counts: {}, products: [] },
  status: Status.LOADING,
  page: 1,
  hasMore: true,
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts(state) {
      state.items = { counts: {}, products: [] };
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSanityProducts.pending, (state) => {
      state.status = Status.LOADING;
      // state.items = { counts: {}, products: [] };
    });
    builder.addCase(fetchSanityProducts.fulfilled, (state, action) => {
      const newProducts = action.payload.products;
      state.items.products.push(...newProducts);
      state.items.counts = action.payload.counts;
      state.status = Status.SUCCESS;
      if (newProducts.length < 10) state.hasMore = false;
    });
    builder.addCase(fetchSanityProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items.products = [];
    });
    builder.addCase(fetchSanityPromoProducts.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSanityPromoProducts.fulfilled, (state, action) => {
      state.items = {
        counts: {},
        products: action.payload.products,
      };
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSanityPromoProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items.products = [];
    });
  },
});

export const { resetProducts, incrementPage } = productsSlice.actions;
export default productsSlice.reducer;
