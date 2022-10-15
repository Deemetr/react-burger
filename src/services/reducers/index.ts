import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { socketMiddleware } from "../socket-middleware";
import { rootReducer } from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware()),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = typeof store.getState;
