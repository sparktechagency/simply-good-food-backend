import { z } from 'zod';
import { mealPlans, menus } from './product.constant';

const createProductZodSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  price: z.string({ required_error: 'Price is required' }),
  protein: z.string({ required_error: 'Protein is required' }),
  carbs: z.string({ required_error: 'Carbs is required' }),
  fat: z.string({ required_error: 'Fat is required' }),
  details: z.string({ required_error: 'Details is required' }),
  ingredient: z.string({ required_error: 'Ingredient is required' }),
  instructions: z.string({ required_error: 'Instructions is required' }),
  menu: z.enum([...menus] as [string, ...string[]], {
    required_error: 'Menu is required',
  }),
  mealPlan: z.enum([...mealPlans] as [string, ...string[]], {
    required_error: 'Meal plan is required',
  }),
  rating: z.string().optional(),
});

const updateProductZodSchema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  protein: z.string().optional(),
  carbs: z.string().optional(),
  fat: z.string().optional(),
  details: z.string().optional(),
  ingredient: z.string().optional(),
  instructions: z.string().optional(),
  menu: z.enum([...menus] as [string, ...string[]]).optional(),
  mealPlan: z.enum([...mealPlans] as [string, ...string[]]).optional(),
  rating: z.string().optional(),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
