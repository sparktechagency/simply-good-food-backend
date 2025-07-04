import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    products: z
      .array(z.object({ product: z.string() }), {
        required_error: 'Product must be and array of object!',
      })
      .nonempty({ message: 'Product can not be an empty!' }),
    price: z.number({ required_error: 'Price is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
    mealPlanType: z.enum(
      [
        'Small Meal',
        'Small Paleo Meal',
        'Medium Meal',
        'Medium Paleo Meal',
        'Large Meal',
        'Large Paleo Meal',
      ],
      { required_error: 'Meal plan type is required' }
    ),
    totalItems: z.number({ required_error: 'Total items is required' }),
    location: z.string().optional(),
    trxId: z.string().optional(),
    deliveryCharge: z.number().optional(),
    status: z.string().optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
