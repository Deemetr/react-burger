import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { Order } from "../../models/order";

interface FeedStore {
  wsConnected: boolean;
  messages: string[];
  error?: string;
  orders: Order[];
  total: number;
  totalToday: number;
}

export const initialState: FeedStore = {
  wsConnected: false,
  messages: [],
  error: undefined,
  orders: [],
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsConncectionSuccess(state) {
      state.error = undefined;
      state.wsConnected = true;
    },
    wsConnectionError(state, action) {
      state.error = action.payload;
      state.wsConnected = false;
    },
    wsConnectionClosed(state) {
      state.error = undefined;
      state.wsConnected = false;
    },
    wsGetMessage(state, action) {
      const { success, orders, total, totalToday } = JSON.parse(action.payload);

      if (!success) {
        return;
      }

      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
    wsConnect(state, action: PayloadAction<string>) {},
    wsDisconnect(state) {},
  },
});

export default feedSlice.reducer;
export const {
  wsConncectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage,
  wsConnect,
  wsDisconnect,
} = feedSlice.actions;

export type TWsActions = {
  disconnect: typeof wsDisconnect;
  connect: typeof wsConnect;
  onOpen: typeof wsConncectionSuccess;
  onError: typeof wsConnectionError;
  onMessage: typeof wsGetMessage;
  onClose: typeof wsConnectionClosed;
};
