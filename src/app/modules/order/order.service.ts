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

export const OrderService = {
  createOrderToDB,
  getAllOrdersFromDB,
  updateOrderStatusToDB,
};
