import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const values = {
    user: user.id,
    ...req.body,
  };

  const result = await OrderService.createOrderToDB(values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order confirm successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order retrieved successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body;
  const result = await OrderService.updateOrderStatusToDB(id, status);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order status update successfully',
    data: result,
  });
});

export const OrderController = { createOrder, getAllOrders, updateOrderStatus };
