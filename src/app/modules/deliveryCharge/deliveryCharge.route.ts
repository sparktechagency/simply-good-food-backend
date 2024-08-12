import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { DeliveryController } from './deliveryCharge.controller';
const router = express.Router();

router
  .route('/')
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    DeliveryController.getDeliveryCharge
  )
  .post(auth(USER_ROLES.ADMIN), DeliveryController.createDeliveryCharge)
  .patch(auth(USER_ROLES.ADMIN), DeliveryController.updateDeliveryCharge)
  .delete(auth(USER_ROLES.ADMIN), DeliveryController.deleteDeliveryCharge);

export const DeliveryChargeRoutes = router;
