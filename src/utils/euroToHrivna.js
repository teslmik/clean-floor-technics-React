export const euroToHrivna = (price) => {
  const oldEuro = 40.0;
  const currentEuro = 42.4;
  return Math.floor((price * currentEuro) / 10) * 10;
}