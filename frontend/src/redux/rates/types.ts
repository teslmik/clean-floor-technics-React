export interface IRatesItem {
  currency: string;
  value: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface IRatesSliceState {
  items: {
    rates: IRatesItem[];
    bankEuro: {
      currencyCodeA?: number;
      currencyCodeB?: number;
      rateSell?: number;
      date?: number;
      rateBuy?: number;
      error?: string;
    } | null;
  };
  status: Status;
}
