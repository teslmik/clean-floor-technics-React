import { NextFunction, Request, Response } from "express";

import { productService } from "../services/product.service";
import { SearchParamsType } from "../types";

class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query as SearchParamsType;
      const products = await productService.getAllProducts(queryParams);

      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getOneProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getOneById(req.params.id);

      return res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
