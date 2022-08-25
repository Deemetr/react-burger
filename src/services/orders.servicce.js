import { postOrder } from "./api/orders-api.service";

async function createOrder(ingredients) {
  const response = await postOrder({ ingredients });

  return response?.order?.number;
}

export { createOrder };
