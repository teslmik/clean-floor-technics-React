import { ICartItem } from "../redux/cart/types";
import { euroToHrivna } from "./euroToHrivna";

export const calcTotalPrice = (items: ICartItem[]) => {
  return items.reduce((sum, obj) => euroToHrivna(obj.price) * obj.count + sum, 0);
}