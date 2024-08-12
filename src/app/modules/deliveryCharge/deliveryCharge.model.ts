import { model, Schema } from 'mongoose';
import { IDeliveryCharge } from './deliveryCharge.interface';

const deliveryChargeSchema = new Schema<IDeliveryCharge>(
  {
    charge: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const DeliveryCharge = model<IDeliveryCharge>(
  'DeliveryCharge',
  deliveryChargeSchema
);
