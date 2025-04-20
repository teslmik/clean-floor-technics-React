import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "@cms/lib/sanitiClient";
import { RootState } from "../store";
import {
  fullProductFields,
  getPromoProducts,
  productsCategoryCount,
} from "./query";
import { ISanityProduct } from "./types";

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
  { page: number },
  { state: RootState }
>("product/fetchSanity", async ({ page }, thunkApi) => {
  const { filter } = thunkApi.getState();
  const orderField = filter.sortState.sortProperty;
  const orderDirection = orderField === "rating" ? "desc" : "asc";
  const filterQuery = filter.filterState.length
    ? `&& category in [${filter.filterState.map((cat) => `"${cat}"`).join(",")}]`
    : "";

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return await client.fetch(`{
    "products": *[_type == "products" ${filterQuery}] | order(${orderField} ${orderDirection})[${start}...${end}] {
      ${fullProductFields}
    },
    ${productsCategoryCount}
  }`);
});
