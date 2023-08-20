export interface ISpecification {
  name: string;
  value: string;
};

export interface IProductItem {
  _id: string;
  description: string[];
  specification: ISpecification[];
  title: string;
  article: string;
  imageUrl: string;
  imageArr: string[];
  label: {
    _promo: boolean;
    _popular: boolean;
    _new: boolean;
  };
  oldPrice: string;
  price: number;
  availability: boolean;
  category: string;
  count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IProductSliceState {
  items: IProductItem[];
  status: Status;
}