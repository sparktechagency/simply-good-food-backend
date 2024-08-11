import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { CouponRoutes } from '../app/modules/coupon/coupon.route';
import { FeedbackRoutes } from '../app/modules/feedback/feedback.route';
import { MealPlanOrderRoutes } from '../app/modules/mealPlanOrder/mealPlanOrder.route';
import { OrderRoutes } from '../app/modules/order/order.route';
import { ProductRoutes } from '../app/modules/product/product.route';
import { UserRoutes } from '../app/modules/user/user.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/meal-plan-order',
    route: MealPlanOrderRoutes,
  },
  {
    path: '/coupon',
    route: CouponRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
