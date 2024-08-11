import { model, Schema } from 'mongoose';
import { IMealPlanOrder, MealPlanOrderModel } from './mealPlanOrder.interface';

const mealPlanOrderSchema = new Schema<IMealPlanOrder, MealPlanOrderModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
        },
      ],
      required: true,
    },
    mealPlanType: {
      type: String,
      enum: [
        'Small Meal',
        'Small Paleo Meal',
        'Medium Meal',
        'Medium Paleo Meal',
        'Large Meal',
        'Large Paleo Meal',
      ],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    trxId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'packing', 'shipping', 'shipped'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const MealPlanOrder = model<IMealPlanOrder, MealPlanOrderModel>(
  'MealPlanOrder',
  mealPlanOrderSchema
);
