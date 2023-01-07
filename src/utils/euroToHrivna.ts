export const euroToHrivna = (price: number) => {
  // const oldEuro = 40.0;
  const currentEuro: number = 42.4;
  return Math.floor((price * currentEuro) / 10) * 10;
}