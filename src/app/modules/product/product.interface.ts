import { Model } from 'mongoose';

export type IProduct = {
  name: string;
  image: string;
  price: string;
  protein: string;
  carbs: string;
  fat: string;
  details: string;
  ingredient: string;
  instructions: string;
  menu: 'Full Menus' | 'Entree' | 'Breakfast' | 'Snacks';
  mealPlan:
    | 'Small Meal'
    | 'Small Paleo Meal'
    | 'Medium Meal'
    | 'Medium Paleo Meal'
    | 'Large Meal'
    | 'Large Paleo Meal';
  rating?: number;
};

export type ProductModel = {} & Model<IProduct>;

export type IFilterOptions = {
  searchTerm?: string;
  menu?: string;
  mealPlan?: string;
};
