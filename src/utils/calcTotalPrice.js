import { euroToHrivna } from "./euroToHrivna";

export const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => euroToHrivna(Number(obj.price)) * obj.count + sum, 0);
}