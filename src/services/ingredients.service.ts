import { IngredientType } from "../enums";
import { fetchIngredients } from "./api/ingredients-api.service";

async function getIngredients() {
  const { data: ingredients } = await fetchIngredients();

  const buns = ingredients.filter(
    (ingredient) => ingredient.type === IngredientType.BUN
  );
  const main = ingredients.filter(
    (ingredient) => ingredient.type === IngredientType.MAIN
  );
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === IngredientType.SAUCE
  );

  return [
    { title: "Булки", items: buns, type: IngredientType.BUN },
    { title: "Соусы", items: sauces, type: IngredientType.SAUCE },
    { title: "Начинка", items: main, type: IngredientType.MAIN },
  ];
}

export { getIngredients };

