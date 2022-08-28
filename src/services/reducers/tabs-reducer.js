import { createSlice } from "@reduxjs/toolkit";
import { INGREDIENT_TYPES } from "../../constants";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    currentTab: INGREDIENT_TYPES.BUN,
  },
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
  },
});

export default tabsSlice.reducer;
export const { setCurrentTab } = tabsSlice.actions;
