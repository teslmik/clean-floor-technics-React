import { ICartItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLC = () => {
  const data = localStorage.getItem('cart');
  const items: ICartItem[] = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice
  };
};