import { SortPropertyEnum } from "@src/redux/filter/types";

export const sortList = [
  { name: "по популярності", sortProperty: SortPropertyEnum.RATING },
  { name: "спочатку дешевщі", sortProperty: SortPropertyEnum.PRICE },
  { name: "по назві", sortProperty: SortPropertyEnum.TITLE },
];
