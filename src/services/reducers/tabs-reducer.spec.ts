import { IngredientType } from "../../enums";
import tabsReducer, { initialState, setCurrentTab } from "./tabs-reducer";

describe("Tabs reducer", () => {
  it("should change current tab", () => {
    const actualState = tabsReducer(
      initialState,
      setCurrentTab(IngredientType.MAIN)
    );

    expect(actualState.currentTab).toEqual(IngredientType.MAIN);
  });
});
