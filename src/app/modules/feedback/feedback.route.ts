import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedback.controller';
const router = express.Router();

router.patch(
  '/status/:id',
  auth(USER_ROLES.ADMIN),
  FeedbackController.feedbackStatusUpdate
);

router.get('/publish', FeedbackController.getAllPublishFeedback);

router
  .route('/')
  .get(auth(USER_ROLES.ADMIN), FeedbackController.getAllFeedback)
  .post(auth(USER_ROLES.USER), FeedbackController.createFeedback);

export const FeedbackRoutes = router;
