import { combineReducers } from "redux";

import ingredients from "./ingredients-reducer";
import orders from "./orders-reducer";
import tabs from "./tabs-reducer";

export const rootReducer = combineReducers({
  ingredients,
  orders,
  tabs,
});
