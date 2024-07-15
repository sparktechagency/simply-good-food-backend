import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IFeedback = {
  user: Types.ObjectId | IUser;
  feedback: string;
  status: 'publish' | 'unpublish';
};

export type FeedbackModel = {
  feedbackStatusSwitcher(id: string): IFeedback;
} & Model<IFeedback>;

export type IFilters = {
  status?: string;
};
