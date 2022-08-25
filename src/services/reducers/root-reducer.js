import { combineReducers } from "redux";

import ingredients from "./ingredients-reducer";
import orders from "./orders-reducer";

export const rootReducer = combineReducers({
  ingredients,
  orders,
});
