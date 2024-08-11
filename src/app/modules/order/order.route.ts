import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
const router = express.Router();

//stripe
router.post(
  '/create-payment-intent',
  auth(USER_ROLES.USER),
  OrderController.createPaymentIntent
);

router.patch(
  '/status-update/:id',
  auth(USER_ROLES.ADMIN),
  OrderController.updateOrderStatus
);

//apply promo code
router.post(
  '/apply-promo-code',
  auth(USER_ROLES.USER),
  OrderController.applyPromoCode
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
