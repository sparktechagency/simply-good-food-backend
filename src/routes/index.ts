import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
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
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
