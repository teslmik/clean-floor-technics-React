import { CategoriesEnum } from "../../@types/categories.enum";

const categoryCounts = Object.values(CategoriesEnum)
  .map((c) => `"${c}": count(*[_type == "products" && category == '${c}'])`)
  .join(",");

export const productsCategoryCount = `
  "counts": {
    ${categoryCounts},
    "availability": count(*[_type == "products" && availability == true]),
    "new": count(*[_type == "products" && label.new == true]),
    "promo": count(*[_type == "products" && label.promo == true]),
    "popular": count(*[_type == "products" && label.popular == true])
  }
`;

export const productCardFields = `
  _id,
  slug,
  title,
  article,
  price,
  oldPrice,
  category,
  label,
  availability,
  discontinued,
  "imageUrl": mainImage.asset->url
`;

export const fullProductFields = `
  _id,
  description,
  specification,
  slug,
  title,
  article,
  price,
  oldPrice,
  category,
  label,
  availability,
  discontinued,
  "imageArr": sliderImages[].asset->url,
  "imageUrl": mainImage.asset->url
`;

export const getPromoProducts = `
  *[_type == "products" && (availability == true || label.new == true || label.popular == true)] {
    ${fullProductFields}
  }
`;
