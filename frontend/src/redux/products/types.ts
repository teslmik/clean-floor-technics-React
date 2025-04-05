import { Products } from "../../@types/types";

export interface ISpecification {
  name: string;
  value: string;
}

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
  oldPrice: number | null;
  price: number;
  availability: boolean;
  discontinued: boolean;
  installments: boolean;
  category: string;
  rating: number;
}

export interface ISanityProduct extends Products {
  imageUrl: string;
  imageArr: string[];
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface IProductSliceState {
  items: { counts: { [key: string]: number }; products: ISanityProduct[] };
  status: Status;
}
