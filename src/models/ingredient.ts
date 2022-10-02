import { IngredientType } from "../enums";

export interface Ingredient {
  type: IngredientType;
  _id: string;
  uuid: string;
  image: string;
  image_mobile: string;
  image_large: string;
  name: string;
  price: number;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}
