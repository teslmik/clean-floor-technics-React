export const euroToHrivna = (price: number) => {
  const rate = Number(localStorage.getItem("currentEuro")) || 0;
  // const oldEuro = 40.0;
  if (rate) return Math.floor((price * rate) / 10) * 10;
  return 0;
};
