import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { MealPlanOrderController } from './mealPlanOrder.controller';
import { OrderValidation } from './mealPlanOrder.validation';
const router = express.Router();

router.patch(
  '/status-update/:id',
  auth(USER_ROLES.ADMIN),
  MealPlanOrderController.updateMealPlanOrderStatus
);

router
  .route('/')
  .get(auth(USER_ROLES.ADMIN), MealPlanOrderController.getAllMealPlanOrders)
  .post(
    auth(USER_ROLES.USER),
    validateRequest(OrderValidation.createOrderZodSchema),
    MealPlanOrderController.createMealPlanOrder
  );

export const MealPlanOrderRoutes = router;
