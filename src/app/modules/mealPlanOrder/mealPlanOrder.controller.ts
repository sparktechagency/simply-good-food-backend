import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
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
  const result = await MealPlanOrderService.getAllMealPlanOrdersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'MealPlanOrder retrieved successfully',
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
};
