import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IMealPlanOrder } from './mealPlanOrder.interface';
import { MealPlanOrder } from './mealPlanOrder.model';

const createMealPlanOrderToDB = async (payload: IMealPlanOrder) => {
  const createMealPlanOrder = await MealPlanOrder.create(payload);
  if (!createMealPlanOrder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "MealPlanOrder doesn't exist!");
  }
  return createMealPlanOrder;
};

const getAllMealPlanOrdersFromDB = async () => {
  const result = await MealPlanOrder.find();
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
};
