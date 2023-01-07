import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { IProductItem } from "./types";

export const fetchProducts = createAsyncThunk<IProductItem[], void, { state: RootState }>('product/fetchProductsStatus', async (_, thunkApi) => {
  const { filter } = thunkApi.getState();
  const order = filter.sortState.sortProperty === 'rating' ? 'desc' : 'asc';
  const { data } = await axios
    .get<IProductItem[]>(`https://636e34f8b567eed48ad655d0.mockapi.io/products?sortBy=${filter.sortState.sortProperty}&order=${order}`);
  return data;
});