export const editValidate = (values: {
  price: number | string;
  availability: boolean;
}) => {
  const errors: {
    price?: string;
    availability?: string;
  } = {};

  if (!values.price.toString().trim()) {
    errors.price = "Price is required";
  } else if (isNaN(+values.price)) {
    errors.price = "Only number";
  } else if (!Number.isFinite(parseFloat(values.price.toString()))) {
    errors.price = "Invalid values";
  }

  return errors;
};
