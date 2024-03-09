import { OrderEnum, SortPropertyEnum } from "../enums";
import { ProductType } from "./product.type";

export type SearchParamsType = {
  sortBy: SortPropertyEnum;
  order: OrderEnum;
  filter: keyof ProductType;
};
