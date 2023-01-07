import { Status } from "../products/types";

export interface IPostItem {
  date: string;
  id: string;
  imageUrl: string;
  text: string[];
  title: string;
}

export interface IPostSliceState {
  items: IPostItem[];
  status: Status;
}
