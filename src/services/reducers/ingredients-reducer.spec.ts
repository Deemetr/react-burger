import { IngredientType } from "../../enums";
import { Ingredient } from "../../models";
import ingredientsReducer, {
   addIngredient, fetchIngredients, initialState,
   moveIngredient,
   removeIngredient,
   setCurrentIngredient
} from "./ingredients-reducer";

const ingredientBun: Ingredient = {
  _id: "123",
  calories: 1,
  carbohydrates: 1,
  fat: 1,
  image: "",
  image_large: "",
  image_mobile: "",
  name: "name",
  price: 20,
  proteins: 1,
  type: IngredientType.BUN,
  uuid: "12",
};

const ingredient: Ingredient = {
  _id: "123",
  calories: 1,
  carbohydrates: 1,
  fat: 1,
  image: "",
  image_large: "",
  image_mobile: "",
  name: "name",
  price: 20,
  proteins: 1,
  type: IngredientType.MAIN,
  uuid: "12",
};

const secondIngredient: Ingredient = {
  _id: "1234",
  calories: 1,
  carbohydrates: 1,
  fat: 1,
  image: "",
  image_large: "",
  image_mobile: "",
  name: "name",
  price: 20,
  proteins: 1,
  type: IngredientType.MAIN,
  uuid: "125",
};

describe("Ingredients reducer", () => {
  it("should set bun", () => {
    const actualState = ingredientsReducer(
      initialState,
      addIngredient(ingredientBun)
    );
    const counters = actualState.counters;

    expect(actualState.selectedBun?._id).toEqual(ingredientBun._id);
    expect(counters[ingredientBun._id]).toEqual(2);
  });

  it("should set ingredient", () => {
    const actualState = ingredientsReducer(
      initialState,
      addIngredient(ingredient)
    );
    const counters = actualState.counters;

    expect(actualState.selectedItems.length).toBe(1);
    const addedIngredient = actualState.selectedItems.find(
      (item) => item._id === ingredient._id
    );
    expect(addedIngredient).not.toBe(null);
    expect(counters[ingredient._id]).toEqual(1);
  });

  it("should remove ingredient", () => {
    const ingredientIndex = 0;
    const actualState = ingredientsReducer(
      {
        ...initialState,
        ...{ selectedItems: [ingredient], counters: { [ingredient._id]: 1 } },
      },
      removeIngredient(ingredientIndex)
    );
    const counters = actualState.counters;

    expect(actualState.selectedItems.length).toBe(0);
    const addedIngredient = actualState.selectedItems.find(
      (item) => item._id === ingredient._id
    );
    expect(addedIngredient).toBe(undefined);
    expect(counters[ingredient._id]).toEqual(0);
  });

  it("should set current ingredient", () => {
    const actualState = ingredientsReducer(
      initialState,
      setCurrentIngredient(ingredient)
    );

    expect(actualState.currentIngredient?._id).toEqual(ingredient._id);
  });

  it("should move ingredient", () => {
    const dragIndex = 0;
    const hoverIndex = 1;

    const actualState = ingredientsReducer(
      { ...initialState, ...{ selectedItems: [ingredient, secondIngredient] } },
      moveIngredient({ dragIndex, hoverIndex })
    );

    expect(actualState.selectedItems[dragIndex]._id).toEqual(
      secondIngredient._id
    );
    expect(actualState.selectedItems[hoverIndex]._id).toEqual(ingredient._id);
  });

  it("should update items list", () => {
    const action = fetchIngredients.fulfilled(
      [{ title: "Булки", items: [ingredientBun], type: IngredientType.BUN }],
      ""
    );

    const actualState = ingredientsReducer(initialState, action);

    expect(actualState.items.length).toBe(1);
    expect(actualState.items[0].type).toEqual(IngredientType.BUN)
  });
});
