type IngredientTypes = {
  [index in "BUN" | "MAIN" | "SAUCE"]: string;
};

const INGREDIENT_TYPES: IngredientTypes = {
  BUN: "bun",
  MAIN: "main",
  SAUCE: "sauce",
};

export { INGREDIENT_TYPES };

