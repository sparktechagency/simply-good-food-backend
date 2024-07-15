import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../shared/genericResponse';
import unlinkFile from '../../../shared/unlinkFile';
import { IPaginationOptions } from '../../../types/pagination';
import { IFilterOptions, IProduct } from './product.interface';
import { Product } from './product.model';

const createProductToDB = async (payload: IProduct): Promise<IProduct> => {
  const createProduct = await Product.create(payload);
  if (!createProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created product');
  }
  return createProduct;
};

const getAllProductFromDB = async (
  filterOptions: IFilterOptions,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filterOptions;

  const andConditions = [];
  let sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  if (searchTerm) {
    andConditions.push({
      $or: ['name', 'ingredient', 'instructions', 'menu', 'mealPlan'].map(
        field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })
      ),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments(whereConditions);
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      totalPage,
      total,
    },
    data: result,
  };
};

const getSingleProductFromDB = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id);
  return result;
};

const updateProductToDB = async (
  id: string,
  payload: IProduct
): Promise<IProduct | null> => {
  const isExistProduct = await Product.findById(id);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist");
  }

  if (payload.image) {
    unlinkFile(isExistProduct.image);
  }

  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductToDB = async (id: string): Promise<IProduct | null> => {
  const isExistProduct = await Product.findById(id);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }

  const result = await Product.findByIdAndDelete(id);

  //unlink file
  unlinkFile(result?.image!);

  return result;
};

export const ProductService = {
  createProductToDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductToDB,
  deleteProductToDB,
};
