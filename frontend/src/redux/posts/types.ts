import { Post } from "../../@types/types";
import { Status } from "../products/types";

export interface IPostItem extends Post {
  imageUrl?: string;
  videoUrl?: string;
  videoLink?: string;
}

export interface IPostSliceState {
  items: IPostItem[];
  status: Status;
}
