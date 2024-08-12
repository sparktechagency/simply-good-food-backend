import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { Coupon } from '../coupon/coupon.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderToDB = async (payload: IOrder) => {
  const createOrder = await Order.create(payload);
  if (!createOrder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Order doesn't exist!");
  }
  return createOrder;
};

const getAllOrdersFromDB = async (paginationOptions: IPaginationOptions) => {
  const { skip, limit, page } =
    paginationHelper.calculatePagination(paginationOptions);
  const result = await Order.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate([
      { path: 'user', select: 'name profile' },
      { path: 'products.product', select: 'name image price' },
    ]);
  const total = await Order.countDocuments();

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const getOrderHistoryFromDB = async (user: JwtPayload) => {
  const result = await Order.find({ user: user.id }).populate(
    'products.product',
    'name image price'
  );
  return result;
};

const updateOrderStatusToDB = async (
  id: string,
  payload: { status: string }
) => {
  const isExistOrder = await Order.findById(id);
  if (!isExistOrder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Order doesn't exist!");
  }
  if (isExistOrder.status === 'delivered') {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `The order cannot be modified because it is already delivered!`
    );
  }

  const updateDoc = await Order.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return updateDoc;
};

//apply promo code
const applyPromoCodeToDB = async (payload: string, user: JwtPayload) => {
  //user check
  const isExistUser = await User.findById(user.id).select('coupons');
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //coupon check
  const isExistCoupon = await Coupon.findOne({ couponCode: payload });
  if (!isExistCoupon) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Coupon doesn't exist!");
  }

  //coupon used check
  if (await isExistUser.coupons.includes(isExistCoupon._id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You already used,this coupon');
  }

  //validity check
  if (new Date() > new Date(isExistCoupon.expireDate)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'The coupon already expired');
  }

  //coupons save
  await User.findOneAndUpdate(
    { _id: user.id },
    { $push: { coupons: isExistCoupon._id } }
  );

  return {
    discount: isExistCoupon.couponDiscount,
  };
};

export const OrderService = {
  createOrderToDB,
  getAllOrdersFromDB,
  updateOrderStatusToDB,
  applyPromoCodeToDB,
  getOrderHistoryFromDB,
};
