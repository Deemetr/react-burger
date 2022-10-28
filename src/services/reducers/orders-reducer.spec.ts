import { Order } from "../../models/order";
import ordersReducer, {
   createOrderThunk, initialState,
   setRequestOrder
} from "./orders-reducer";

describe("Orders reducer", () => {
  it("should set loading state", () => {
    const actualState = ordersReducer(initialState, setRequestOrder(true));

    expect(actualState.requestOrder).toBe(true);
  });

  it("should set loading state", () => {
    const currentOrder: Order = {
      name: "ORDER",
      number: 1,
      _id: "453",
      createdAt: "",
      ingredients: [],
      status: "done",
      updatedAt: "",
    };
    const action = createOrderThunk.fulfilled(currentOrder, '', []);
    const actualState = ordersReducer(initialState, action);

    expect(actualState.currentOrder.number).toBe(currentOrder.number);
  });
});
