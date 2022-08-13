import { fetchIngredients } from "./api/ingredients-api.service";
import { INGREDIENT_TYPES } from "../constants";

async function getIngredients() {
  const { data: ingredients } = await fetchIngredients();

  const buns = ingredients.filter(
    (ingredient) => ingredient.type === INGREDIENT_TYPES.BUN
  );
  const main = ingredients.filter(
    (ingredient) => ingredient.type === INGREDIENT_TYPES.MAIN
  );
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === INGREDIENT_TYPES.SAUCE
  );

  return [
    { title: "Булки", items: buns },
    { title: "Соусы", items: sauces },
    { title: "Начинка", items: main },
  ];
}

export { getIngredients };
