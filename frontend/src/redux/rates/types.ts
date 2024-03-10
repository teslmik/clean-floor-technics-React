export interface IRatesItem {
  currency: string;
  value: number | string;
}

export interface IBankRate {
  currencyCodeA?: number;
  currencyCodeB?: number;
  rateSell?: number;
  date?: number;
  rateBuy?: number;
  error?: string;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  IDLE = "idle",
}

export interface IRatesSliceState {
  items: {
    rates: IRatesItem[];
    bankEuro: IBankRate | null;
  };
  status: Status;
}
