import { NextFunction, Request, Response } from "express";

import { ratesService } from "../services/rates.service";

class RatesController {
  async getRates(req: Request, res: Response, next: NextFunction) {
    try {
      const rates = await ratesService.getRates();

      return res.json(rates);
    } catch (error) {
      next(error);
    }
  }
}

export const ratesController = new RatesController();
