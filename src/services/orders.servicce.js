import { postOrder } from "./api/orders-api.service";

async function createOrder(ingredients) {
  return postOrder({ ingredients });
}

export { createOrder };
