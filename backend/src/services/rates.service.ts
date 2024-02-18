import RatesModel from "../models/rates.model";

class RatesService {
  async getRates(): Promise<{ value: number }[]> {
    const rates = await RatesModel.find();

    return rates;
  }

  // euro 978, usd 840, uah 980
}

export const ratesService = new RatesService();
