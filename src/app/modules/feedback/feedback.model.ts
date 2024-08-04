import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { FeedbackModel, IFeedback } from './feedback.interface';

const feedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['publish', 'unpublish'],
      default: 'unpublish',
    },
  },
  { timestamps: true }
);

feedbackSchema.statics.feedbackStatusSwitcher = async (id: string) => {
  const isExistFeedback = await Feedback.findById(id);
  if (!isExistFeedback) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Feedback doesn't exist!");
  }
  const statusUpdate =
    isExistFeedback.status !== 'publish' ? 'publish' : 'unpublish';
  return await Feedback.findOneAndUpdate(
    { _id: id },
    { status: statusUpdate },
    { new: true }
  );
};

export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  feedbackSchema
);
