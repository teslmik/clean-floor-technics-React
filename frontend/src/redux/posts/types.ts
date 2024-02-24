import { Status } from "../products/types";

export interface IPostItem {
  createdAt: string;
  deletedAt: string;
  _id: string;
  imageUrl: string;
  text: string[];
  title: string;
}

export interface IPostSliceState {
  items: IPostItem[];
  status: Status;
}
