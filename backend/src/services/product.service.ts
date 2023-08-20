import { OrderEnum } from '../enums';
import ProductModel from '../models/product.model';
import { ProductType, SearchParamsType } from '../types';

class ProductService {
  async getAllProducts({ sortBy, order }: SearchParamsType): Promise<ProductType[]> {
    const sortField = sortBy as keyof ProductType;
    const sortOrder = order === OrderEnum.DESC ? -1 : 1;

    const products = await ProductModel.find().sort({ [sortField]: sortOrder });

    return products;
  }

  async getOneById(_id: string) {
    const product = await ProductModel.findOne({ _id });

    return product;
  }
}

export const productService = new ProductService();