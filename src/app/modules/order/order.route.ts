import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
const router = express.Router();

router.patch(
  '/status-update/:id',
  auth(USER_ROLES.ADMIN),
  OrderController.updateOrderStatus
);

router
  .route('/')
  .get(auth(USER_ROLES.ADMIN), OrderController.getAllOrders)
  .post(
    auth(USER_ROLES.USER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
  );

export const OrderRoutes = router;
