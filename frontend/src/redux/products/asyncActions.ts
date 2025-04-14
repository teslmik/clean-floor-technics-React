import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import client from "@cms/lib/sanitiClient";
import { RootState } from "../store";
import {
  fullProductFields,
  getPromoProducts,
  productsCategoryCount,
} from "./query";
import { IProductItem, ISanityProduct } from "./types";

export const fetchSanityPromoProducts = createAsyncThunk<
  {
    products: ISanityProduct[];
  },
  void,
  { state: RootState }
>("product/fetchSanityPromo", async () => {
  const products = await client.fetch(getPromoProducts);
  return { products };
});

export const fetchSanityProducts = createAsyncThunk<
  {
    counts: { [key: string]: number };
    products: ISanityProduct[];
  },
  void,
  { state: RootState }
>("product/fetchSanity", async (_, thunkApi) => {
  const { filter } = thunkApi.getState();
  const orderField = filter.sortState.sortProperty;
  const orderDirection = orderField === "rating" ? "desc" : "asc";
  const filterQuery = filter.filterState.length
    ? `&& category in [${filter.filterState.map((cat) => `"${cat}"`).join(",")}]`
    : "";

  return await client.fetch(`{
    "products": *[_type == "products" ${filterQuery}] | order(${orderField} ${orderDirection}) {
      ${fullProductFields}
    },
    ${productsCategoryCount}
  }`);
});

export const fetchProducts = createAsyncThunk<
  {
    counts: { [key: string]: number };
    products: IProductItem[];
  },
  void,
  { state: RootState }
>("product/fetchProductsStatus", async (_, thunkApi) => {
  const { filter } = thunkApi.getState();
  const order = filter.sortState.sortProperty === "rating" ? "desc" : "asc";
  const { data } = await axios.get<{
    counts: { [key: string]: number };
    products: IProductItem[];
  }>(
    `${import.meta.env.VITE_APP_FETCH_URL}/products?sortBy=${
      filter.sortState.sortProperty
    }&order=${order}&filter=${filter.filterState.join(",")}`,
  );
  console.log({ products: data });

  return data;
});

export const editProduct = createAsyncThunk<
  IProductItem,
  { payload: Partial<IProductItem>; id: string },
  { state: RootState }
>("product/editProducts", async ({ payload, id }) => {
  const { data } = await axios.put<IProductItem>(
    `${import.meta.env.VITE_APP_FETCH_URL}/products/${id}`,
    payload,
  );
  return data;
});
