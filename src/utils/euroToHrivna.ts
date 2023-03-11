import { CURRENT_EURO } from "../constants/currentEuro";

export const euroToHrivna = (price: number) => {
  // const oldEuro = 40.0;
  return Math.floor((price * CURRENT_EURO) / 10) * 10;
}