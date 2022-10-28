import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createOrder } from "../orders.servicce";

export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  createOrder
);

export interface CurrentOrder {
  name: string;
  number: number | null;
}

interface OrderStore {
  currentOrder: CurrentOrder;
  requestOrder: boolean;
}

export const initialState: OrderStore = {
  currentOrder: {
    name: "",
    number: null,
  },
  requestOrder: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setRequestOrder(state, action) {
      state.requestOrder = action.payload;
    },
  },
  extraReducers: {
    [createOrderThunk.fulfilled.toString()]: (state, action) => {
      state.currentOrder = action.payload;
      state.requestOrder = false;
    },
  },
});

export default ordersSlice.reducer;
export const { setRequestOrder } = ordersSlice.actions;
export const setOrderObject = createOrderThunk.fulfilled;
