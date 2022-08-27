import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createOrder } from "../orders.servicce";

export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  createOrder
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    currentOrder: {
      name: "",
      number: null,
    },
    requestOrder: false
  },
  reducers: {
    setRequestOrder(state, action) {
      state.requestOrder = action.payload;
    }
  },
  extraReducers: {
    [createOrderThunk.fulfilled]: (state, action) => {
      state.currentOrder = action.payload;
      state.requestOrder = false;
    },
  },
});

export default ordersSlice.reducer;
export const { setRequestOrder } = ordersSlice.actions;
export const setOrderObject = createOrderThunk.fulfilled;
