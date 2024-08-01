import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderToDB = async (payload: IOrder) => {
  const createOrder = await Order.create(payload);
  if (!createOrder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Order doesn't exist!");
  }
  return createOrder;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

export const OrderService = {
  createOrderToDB,
  getAllOrdersFromDB,
};
