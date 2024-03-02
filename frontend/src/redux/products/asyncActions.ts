import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { IProductItem } from "./types";

export const fetchProducts = createAsyncThunk<
  IProductItem[],
  void,
  { state: RootState }
>("product/fetchProductsStatus", async (_, thunkApi) => {
  const { filter } = thunkApi.getState();
  const order = filter.sortState.sortProperty === "rating" ? "desc" : "asc";
  const { data } = await axios.get<IProductItem[]>(
    `${process.env.REACT_APP_FETCH_URL}/products?sortBy=${filter.sortState.sortProperty}&order=${order}`
  );
  return data;
});

export const editProduct = createAsyncThunk<
  IProductItem,
  { payload: Partial<IProductItem>; id: string },
  { state: RootState }
>("product/editProducts", async ({ payload, id }) => {
  const { data } = await axios.put<IProductItem>(
    `${process.env.REACT_APP_FETCH_URL}/products/${id}`,
    payload
  );
  return data;
});
