import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const value = {
    user: user.id,
    ...req.body,
  };

  const result = await FeedbackService.createFeedbackToDB(value);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Feedback send successfully',
    data: result,
  });
});

const feedbackStatusUpdate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FeedbackService.feedbackStatusUpdateToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Feedback ${result.status} successfully`,
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, ['status']);
  const result = await FeedbackService.getAllFeedbackFromDB(
    paginationOptions,
    filters
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Feedback retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getAllPublishFeedback = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await FeedbackService.getAllPublishFeedbackFromDB(
      paginationOptions
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'All Feedback retrieved successfully',
      pagination: result.meta,
      data: result.data,
    });
  }
);

export const FeedbackController = {
  createFeedback,
  feedbackStatusUpdate,
  getAllFeedback,
  getAllPublishFeedback,
};
