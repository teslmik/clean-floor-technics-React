import { Schema, model } from 'mongoose';

import { CategoriesEnum } from '../enums';
import { LabelType, ProductType, SpecificationType } from '../types';

const SpecificationSchema = new Schema<SpecificationType>({
  name: String,
  value: String,
},
  { autoIndex: false }
);

const LabelSchema = new Schema<LabelType>({
  _promo: {
    type: Boolean,
    default: false,
  },
  _popular: {
    type: Boolean,
    default: false,
  },
  _new: {
    type: Boolean,
    default: false,
  },
},
  { autoIndex: false }
);

const ProductSchema = new Schema<ProductType>({
  description: [String],
  specification: [SpecificationSchema],
  rating: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    required: true,
  },
  article: String,
  imageUrl: {
    type: String,
    required: true,
  },
  imageArr: [String],
  label: LabelSchema,
  oldPrice: String,
  price: Number,
  availability: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: Object.values(CategoriesEnum),
    required: true,
  },
  deletedAt: {
    type: Date,
    default: null,
  }
},
  {
    timestamps: true,
  });

export default model<ProductType>('Product', ProductSchema);