import { StatusCodes } from 'http-status-codes';
import { SortValues } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../shared/genericResponse';
import { IPaginationOptions } from '../../../types/pagination';
import { IFeedback, IFilters } from './feedback.interface';
import { Feedback } from './feedback.model';

const createFeedbackToDB = async (payload: IFeedback): Promise<IFeedback> => {
  const createFeedback = await Feedback.create(payload);
  if (!createFeedback) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to send feedback,try again!'
    );
  }
  return createFeedback;
};

const feedbackStatusUpdateToDB = async (id: string): Promise<IFeedback> => {
  const result = await Feedback.feedbackStatusSwitcher(id);
  return result;
};

const getAllFeedbackFromDB = async (
  paginationOptions: IPaginationOptions,
  filters: IFilters
): Promise<IGenericResponse<IFeedback[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortValues } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    Object.keys(filters).length > 0
      ? { $and: [{ status: filters.status }] }
      : {};

  const result = await Feedback.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Feedback.countDocuments(whereConditions);
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

export const FeedbackService = {
  createFeedbackToDB,
  feedbackStatusUpdateToDB,
  getAllFeedbackFromDB,
};
