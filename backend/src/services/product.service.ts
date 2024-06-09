import { OrderEnum } from "../enums";
import ProductModel from "../models/product.model";
import {
  AddProductType,
  LabelType,
  ProductType,
  SearchParamsType,
} from "../types";

class ProductService {
  public async getAllProducts({ sortBy, order, filter }: SearchParamsType) {
    const sortField = sortBy as keyof ProductType;
    const sortOrder = order === OrderEnum.DESC ? -1 : 1;

    let filterObject = {} as {
      category?: { $in: string[] };
      availability?: boolean;
    };
    const labels = [] as (keyof LabelType)[];
    if (filter) {
      filterObject = filter.split(",").reduce(
        (acc, item) => {
          const trimmedItem = item.trim();
          if (trimmedItem === "availability") {
            acc.availability = true;
          } else if (trimmedItem.startsWith("_") && trimmedItem.length > 1) {
            labels.push(trimmedItem as keyof LabelType);
          } else if (!trimmedItem.startsWith("_")) {
            acc.category = {
              $in: acc.category?.$in
                ? [...acc.category.$in, trimmedItem]
                : [trimmedItem],
            };
          }
          return acc;
        },
        {} as {
          category?: { $in: string[] };
          availability?: boolean;
        },
      );
    }

    const [
      products,
      scrubber,
      rotary,
      vacuum,
      extractor,
      sweeping,
      fan,
      accessories,
      availability,
      labelsObj,
    ] = await Promise.all([
      ProductModel.find(filterObject).sort({
        [sortField]: sortOrder,
      }),
      ProductModel.countDocuments({ category: "scrubber" }),
      ProductModel.countDocuments({ category: "rotary" }),
      ProductModel.countDocuments({ category: "vacuum" }),
      ProductModel.countDocuments({ category: "extractor" }),
      ProductModel.countDocuments({ category: "sweeping" }),
      ProductModel.countDocuments({ category: "fan" }),
      ProductModel.countDocuments({ category: "accessories" }),
      ProductModel.countDocuments({ availability: true }),
      ProductModel.find().then((data) =>
        data.reduce(
          (acc, product) => {
            if (product.label["_new"] === true) acc.new++;
            if (product.label["_promo"] === true) acc.promo++;
            if (product.label["_popular"] === true) acc.popular++;

            return acc;
          },
          { promo: 0, new: 0, popular: 0 },
        ),
      ),
    ]);

    const filteredLabel =
      labels.length > 0
        ? products.filter((product) =>
            labels.every(
              (label) => product.label[label] && product.label[label] === true,
            ),
          )
        : products;

    return {
      products: filteredLabel,
      counts: {
        scrubber,
        rotary,
        vacuum,
        extractor,
        sweeping,
        fan,
        accessories,
        availability,
        new: labelsObj.new,
        promo: labelsObj.promo,
        popular: labelsObj.popular,
      },
    };
  }

  public async getOneById(_id: string) {
    const product = await ProductModel.findOneAndUpdate({ _id }, { $inc: { rating: 1 }}, {returnDocument: "after"});

    return product;
  }

  public async addOne(payload: AddProductType) {
    const product = await ProductModel.create(payload);

    return product;
  }

  public async editById(_id: string, payload: Partial<ProductType>) {
    const product = await ProductModel.findByIdAndUpdate({ _id }, payload, {
      new: true,
    });

    return product;
  }
}

export const productService = new ProductService();
