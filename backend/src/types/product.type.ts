import { CategoriesEnum } from "../enums/categories.enum";

export type SpecificationType = {
  name: string;
  value: string;
};

export type LabelType = {
  _promo: boolean;
  _popular: boolean;
  _new: boolean;
};

export type ProductType = {
  description: string[];
  specification: SpecificationType[];
  rating: number;
  title: string;
  article: string;
  imageUrl: string;
  imageArr: string[];
  label: LabelType;
  oldPrice: string;
  price: number;
  availability: boolean;
  category: CategoriesEnum;
  createdAt: Date;
  deletedAt: Date;
};
