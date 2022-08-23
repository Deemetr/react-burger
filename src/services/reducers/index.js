import { createStore } from "redux";
import { combineReducers } from "redux";

import { enhancer } from '../redux-browser-middleware';

const initialState = {
  nothing: "nothing",
};

const nothingReducer = (state, action) => {
  return initialState;
};

const rootReducer = combineReducers({
  nothingReducer,
});

export const store = createStore(rootReducer, enhancer);
