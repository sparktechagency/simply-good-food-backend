import { model, Schema } from 'mongoose';
import { mealPlans, menus } from './product.constant';
import { IProduct, ProductModel } from './product.interface';

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    protein: {
      type: String,
      required: true,
    },
    carbs: {
      type: String,
      required: true,
    },
    fat: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    ingredient: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    menu: {
      type: String,
      enum: menus,
      required: true,
    },
    mealPlan: {
      type: String,
      enum: mealPlans,
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Product = model<IProduct, ProductModel>('Product', productSchema);
