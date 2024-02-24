export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortTypeState = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface IFilterSliceState {
  filterState: string[],
  sortState: SortTypeState,
}