import { model, Schema } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder>(
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
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
      required: true,
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
    },
    location: {
      type: String,
    },
    trxId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'packing', 'shipping', 'shipped'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
