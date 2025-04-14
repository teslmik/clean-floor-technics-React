import { ICartItem } from "../redux/cart/types";
import { euroToHrivna } from "./euroToHrivna";

export const calcTotalPrice = (items: ICartItem[]) => {
  return items.reduce(
    (sum, obj) => euroToHrivna(obj.price || 0) * obj.count + sum,
    0,
  );
};
