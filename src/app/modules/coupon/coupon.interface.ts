import { Model } from 'mongoose';

export type ICoupon = {
  couponCode: string;
  couponDiscount: number;
  expireDate: string;
};

export type CouponModel = Model<ICoupon, Record<string, unknown>>;
