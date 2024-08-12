import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import { IMealPlanOrder } from './mealPlanOrder.interface';
import { MealPlanOrder } from './mealPlanOrder.model';

const createMealPlanOrderToDB = async (payload: IMealPlanOrder) => {
  const createMealPlanOrder = await MealPlanOrder.create(payload);
  if (!createMealPlanOrder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "MealPlanOrder doesn't exist!");
  }
  return createMealPlanOrder;
};

const getAllMealPlanOrdersFromDB = async (
  paginationOptions: IPaginationOptions
) => {
  const { skip, limit, page } =
    paginationHelper.calculatePagination(paginationOptions);

  const result = await MealPlanOrder.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate([
      { path: 'user', select: 'name profile' },
      { path: 'products.product', select: 'name image price' },
    ]);
  const total = await MealPlanOrder.countDocuments();

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
  const result = await MealPlanOrder.find({ user: user.id }).populate(
    'products.product',
    'name image price'
  );
  return result;
};

const updateMealPlanOrderStatusToDB = async (
  id: string,
  payload: { status: string }
) => {
  const isExistMealPlanOrder = await MealPlanOrder.findById(id);
  if (!isExistMealPlanOrder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "MealPlanOrder doesn't exist!");
  }
  if (isExistMealPlanOrder.status === 'delivered') {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `The MealPlanOrder cannot be modified because it is already delivered!`
    );
  }

  const updateDoc = await MealPlanOrder.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return updateDoc;
};

export const MealPlanOrderService = {
  createMealPlanOrderToDB,
  getAllMealPlanOrdersFromDB,
  updateMealPlanOrderStatusToDB,
  getOrderHistoryFromDB,
};
