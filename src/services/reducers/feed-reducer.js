import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    wsConnected: false,
    messages: [],
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0,
  },
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

      debugger;

      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
  },
});

export default feedSlice.reducer;
export const {
  wsConncectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage,
} = feedSlice.actions;
