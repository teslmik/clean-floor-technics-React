import RatesModel from "../models/rates.model";
import { RatesType } from "../types";

class RatesService {
  async getRates(): Promise<RatesType[]> {
    const rates = await RatesModel.find().select([
      "currency",
      "value",
      "updatedAt",
    ]);

    return rates;
  }

  async editRate({ currency, value }: { currency: string; value: number }) {
    const rates = await RatesModel.findOneAndUpdate(
      { currency },
      { value },
      { upsert: true, new: true },
    ).select(["currency", "value", "updatedAt"]);

    return rates;
  }
}

export const ratesService = new RatesService();
