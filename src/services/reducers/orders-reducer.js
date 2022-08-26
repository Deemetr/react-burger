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
      name: '',
      number: null
    },
  },
  reducers: {},
  extraReducers: {
    [createOrderThunk.fulfilled]: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
});

export default ordersSlice.reducer;
