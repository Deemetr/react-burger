import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { socketMiddleware } from "../socket-middleware";
import {
  wsConncectionSuccess,
  wsConnect,
  wsConnectionClosed,
  wsConnectionError,
  wsDisconnect,
  wsGetMessage
} from "./feed-reducer";
import { rootReducer } from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware({
        connect: wsConnect,
        disconnect: wsDisconnect,
        onMessage: wsGetMessage,
        onClose: wsConnectionClosed,
        onError: wsConnectionError,
        onOpen: wsConncectionSuccess,
      })
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
