import { Model, Types } from 'mongoose';

export type IMealPlanOrder = {
  user: Types.ObjectId;
  products: { product: Types.ObjectId }[];
  price: number;
  quantity: number;
  mealPlanType:
    | 'Small Meal'
    | 'Small Paleo Meal'
    | 'Medium Meal'
    | 'Medium Paleo Meal'
    | 'Large Meal'
    | 'Large Paleo Meal';
  totalItems: number;
  location?: string;
  trxId: string;
  deliveryCharge: number;
  status: 'pending' | 'packing' | 'shipping' | 'delivered';
};

export type MealPlanOrderModel = {} & Model<IMealPlanOrder>;
