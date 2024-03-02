import { NextFunction, Request, Response } from "express";

import { ratesService } from "../services/rates.service";

type monoRatesType = {
  currencyCodeA: number;
  currencyCodeB: number;
  rateSell: number;
  date: number;
  rateBuy: number;
};

class RatesController {
  async getRates(req: Request, res: Response, next: NextFunction) {
    try {
      const [rates, bankRates] = await Promise.all([
        ratesService.getRates(),
        fetch("https://api.monobank.ua/bank/currency", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }).then((res) => res.json()) as Promise<
          monoRatesType[] | { errorDescription: string }
        >,
      ]);

      const backEuro = Array.isArray(bankRates)
        ? bankRates.find(
            (rate) => rate.currencyCodeA === 978 && rate.currencyCodeB === 980,
          )
        : { error: bankRates.errorDescription };

      return res.json({ rates, backEuro });
    } catch (error) {
      next(error);
    }
  }

  async editRates(req: Request, res: Response, next: NextFunction) {
    try {
      const newRate = await ratesService.editRate(req.body);

      return res.json(newRate);
    } catch (error) {
      next(error);
    }
  }
}

export const ratesController = new RatesController();
