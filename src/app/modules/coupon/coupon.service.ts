import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';

import { IPaginationOptions } from '../../../types/pagination';

import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../shared/genericResponse';
import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCouponToDB = async (payload: ICoupon): Promise<ICoupon> => {
  const createCoupon = await Coupon.create(payload);

  if (!createCoupon) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created coupon');
  }

  return createCoupon;
};

const getAllCouponFromDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICoupon[]>> => {
  const { skip, page, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Coupon.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Coupon.countDocuments();
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      totalPage,
      total,
    },
    data: result,
  };
};

const updateCouponToDB = async (
  id: string,
  payload: ICoupon
): Promise<ICoupon | null> => {
  const isExistCoupon = await Coupon.findById(id);
  if (!isExistCoupon) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Coupon doesn't exits!");
  }

  const updateCoupon = await Coupon.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateCoupon;
};

const deleteCouponToDB = async (id: string): Promise<void> => {
  await Coupon.findByIdAndDelete(id);
};

export const CouponService = {
  createCouponToDB,
  deleteCouponToDB,
  updateCouponToDB,
  getAllCouponFromDB,
};
