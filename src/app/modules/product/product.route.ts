import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';
const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductValidation.createProductZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return ProductController.createProduct(req, res, next);
  }
);

router
  .route('/:id')
  .get(ProductController.getSingleProduct)
  .patch(
    auth(USER_ROLES.ADMIN),
    fileUploadHandler(),
    validateRequest(ProductValidation.updateProductZodSchema),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = ProductValidation.updateProductZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return ProductController.updateProduct(req, res, next);
    }
  )
  .delete(auth(USER_ROLES.ADMIN), ProductController.deleteProduct);

router.get('/', ProductController.getAllProduct);

export const ProductRoutes = router;
