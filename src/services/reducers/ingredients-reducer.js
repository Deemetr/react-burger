import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../ingredients.service";

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
  },
  reducers: {
    addIngredient(state, action) {
      state.selectedItems.push(action.payload);
    },
    removeIngredient(state, action) {
      state.selectedItems.splice(action.index, 1);
    },
    setCurrentIngredient(state, action) {
      state.currentIngredient = action.payload;
    },
  },
  extraReducers: {
    [fetchIngredients.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default ingredientsSlice.reducer;
export const { addIngredient, removeIngredient, setCurrentIngredient } =
  ingredientsSlice.actions;
