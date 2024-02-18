export interface IRatesItem {
  currency: string;
  value: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IRatesSliceState {
  items: IRatesItem[];
  status: Status;
}