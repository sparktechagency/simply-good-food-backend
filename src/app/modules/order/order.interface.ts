import { Model, Types } from 'mongoose';

export type IOrder = {
  user: Types.ObjectId;
  products: { product: Types.ObjectId; quantity: number }[];
  price: number;
  totalItems: number;
  location?: string;
  trxId: string;
  deliveryCharge: number;
  status: 'pending' | 'packing' | 'shipping' | 'delivered';
};

export type OrderModel = {} & Model<IOrder>;
