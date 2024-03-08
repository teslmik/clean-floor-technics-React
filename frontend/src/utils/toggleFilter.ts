export const toggleFilter = (value: string, filterState: string[]) => {
  const currentIndex = filterState.indexOf(value);
  const newChecked = [...filterState];

  currentIndex === -1
    ? newChecked.push(value)
    : newChecked.splice(currentIndex, 1);

  return newChecked;
};
