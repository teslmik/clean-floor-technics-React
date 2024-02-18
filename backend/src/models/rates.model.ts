import { Schema, model } from "mongoose";

import { RatesType } from "../types";

const RatesSchema = new Schema<RatesType>(
  {
    currency: String,
    value: Number,
  },
  {
    timestamps: true,
  },
);

export default model<RatesType>("Rates", RatesSchema);
