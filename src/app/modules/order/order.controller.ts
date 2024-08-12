import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
const stripe = new Stripe(config.stripe_secret_key as string);

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
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getAllOrdersFromDB(paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order retrieved successfully',
    pagination: result.meta,
    data: result.data,
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

//apply promo code
const getOrderHistory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await OrderService.getOrderHistoryFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order history retrieved successfully',
    data: result,
  });
});

//apply promo code
const applyPromoCode = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const promo = req.body.promo;
  const result = await OrderService.applyPromoCodeToDB(promo, user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order retrieved successfully',
    data: result,
  });
});

//create payment intent
const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { price } = req.body;

  if (typeof price !== 'number' || price <= 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid price amount');
  }

  const amount = Math.trunc(price * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Payment intent created successfully!',
    data: paymentIntent.client_secret,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  createPaymentIntent,
  applyPromoCode,
  getOrderHistory,
};
