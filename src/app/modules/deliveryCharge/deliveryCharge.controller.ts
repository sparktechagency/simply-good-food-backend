import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DeliveryService } from './deliveryCharge.service';

const createDeliveryCharge = catchAsync(async (req: Request, res: Response) => {
  const { ...charge } = req.body;

  const result = await DeliveryService.createDeliveryChargeToDB(charge);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Delivery charge created successfully',
    data: result,
  });
});

const getDeliveryCharge = catchAsync(async (req: Request, res: Response) => {
  const result = await DeliveryService.getDeliveryChargeFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Delivery charge created successfully',
    data: result,
  });
});

const updateDeliveryCharge = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const charge = req.body;

  const result = await DeliveryService.updateDeliveryChargeToDB(id, charge);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Delivery charge created successfully',
    data: result,
  });
});

const deleteDeliveryCharge = catchAsync(async (req: Request, res: Response) => {
  const result = await DeliveryService.deleteDeliveryChargeToDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Delivery charge created successfully',
    data: result,
  });
});

export const DeliveryController = {
  createDeliveryCharge,
  getDeliveryCharge,
  updateDeliveryCharge,
  deleteDeliveryCharge,
};
