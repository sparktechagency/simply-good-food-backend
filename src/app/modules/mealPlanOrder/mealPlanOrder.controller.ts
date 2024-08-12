import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { MealPlanOrderService } from './mealPlanOrder.service';

const createMealPlanOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const values = {
    user: user.id,
    ...req.body,
  };

  const result = await MealPlanOrderService.createMealPlanOrderToDB(values);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'MealPlanOrder confirm successfully',
    data: result,
  });
});

const getAllMealPlanOrders = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await MealPlanOrderService.getAllMealPlanOrdersFromDB(
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'MealPlanOrder retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getOrderHistory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await MealPlanOrderService.getOrderHistoryFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Meal Order history retrieved successfully',
    data: result,
  });
});

const updateMealPlanOrderStatus = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const status = req.body;
    const result = await MealPlanOrderService.updateMealPlanOrderStatusToDB(
      id,
      status
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'MealPlanOrder status update successfully',
      data: result,
    });
  }
);

export const MealPlanOrderController = {
  createMealPlanOrder,
  getAllMealPlanOrders,
  updateMealPlanOrderStatus,
  getOrderHistory,
};
