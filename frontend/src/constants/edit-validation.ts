export const editValidate = (values: {
  price: number | string;
  oldPrice: number | string | null;
  availability: boolean;
}) => {
  const errors: {
    price?: string;
    availability?: string;
    oldPrice?: string;
  } = {};

  if (!values.price.toString().trim()) {
    errors.price = "Price is required";
  } else if (isNaN(+values.price)) {
    errors.price = "Only number";
  } else if (!Number.isFinite(parseFloat(values.price.toString()))) {
    errors.price = "Invalid values";
  }
  if (values.oldPrice) {
    if (!values.oldPrice.toString().trim()) {
      errors.oldPrice = "Price is required";
    } else if (isNaN(+values.oldPrice)) {
      errors.oldPrice = "Only number";
    } else if (!Number.isFinite(parseFloat(values.oldPrice.toString()))) {
      errors.oldPrice = "Invalid values";
    }
  }

  return errors;
};
