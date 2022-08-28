import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

import { INGREDIENT_TYPES } from "../../constants";
import { getIngredients } from "../ingredients.service";

import { setOrderObject } from "./orders-reducer";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  getIngredients
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: [],
    selectedItems: [],
    currentIngredient: null,
    selectedBun: null,
    counters: {},
  },
  reducers: {
    addIngredient(state, action) {
      const ingredient = action.payload;

      if (ingredient.type === INGREDIENT_TYPES.BUN) {
        state.counters[state.selectedBun?._id] = 0;
        state.counters[ingredient._id] = 2;
        state.selectedBun = ingredient;
        return;
      }

      if (!state.counters[ingredient._id]) {
        state.counters[ingredient._id] = 0;
      }
      state.counters[ingredient._id] += 1;
      state.selectedItems.push({ ...action.payload, uuid: uuidv4() });
    },
    removeIngredient(state, action) {
      const deletedIngredient = state.selectedItems[action.payload];
      state.counters[deletedIngredient._id] -= 1;
      state.selectedItems.splice(action.payload, 1);
    },
    setCurrentIngredient(state, action) {
      state.currentIngredient = action.payload;
    },
    moveIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;

      const dragIngredient = state.selectedItems[dragIndex];
      const newSelected = [...state.selectedItems];
      newSelected.splice(dragIndex, 1);
      newSelected.splice(hoverIndex, 0, dragIngredient);

      state.selectedItems = newSelected;
    },
  },
  extraReducers: {
    [fetchIngredients.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [setOrderObject]: (state, action) => {
      state.selectedItems = [];
      state.selectedBun = null;
    },
  },
});

export default ingredientsSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  setCurrentIngredient,
  moveIngredient,
} = ingredientsSlice.actions;
