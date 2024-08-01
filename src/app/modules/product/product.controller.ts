import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/constrant';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }
  const value = {
    image,
    ...req.body,
  };
  const result = await ProductService.createProductToDB(value);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filterOptions = pick(req.query, ['searchTerm', 'menu', 'mealPlan']);
  const result = await ProductService.getAllProductFromDB(
    filterOptions,
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Product retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getRelatedProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ProductService.getRelatedProductFromDB(
    id,
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Related Product retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.getSingleProductFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }
  const value = {
    image,
    ...req.body,
  };
  const result = await ProductService.updateProductToDB(id, value);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.deleteProductToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getRelatedProduct,
};
