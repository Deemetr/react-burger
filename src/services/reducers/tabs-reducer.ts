import { createSlice } from "@reduxjs/toolkit";
import { IngredientType } from "../../enums";

interface TabStore {
  currentTab: IngredientType;
}

const initialState: TabStore = {
  currentTab: IngredientType.BUN,
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
  },
});

export default tabsSlice.reducer;
export const { setCurrentTab } = tabsSlice.actions;
