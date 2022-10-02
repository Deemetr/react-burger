import { IngredientType } from "../enums";
import { Ingredient } from "./ingredient";

export interface IngredientGroup {
  title: string;
  items: Ingredient[];
  type: IngredientType;
}
