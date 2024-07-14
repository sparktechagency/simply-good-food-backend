import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../shared/genericResponse';
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
  const { searchTerm, ...othersFilter } = filterOptions;

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

  const result = await Product.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments();
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

export const ProductService = {
  createProductToDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
