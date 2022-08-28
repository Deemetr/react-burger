import { postOrder } from "./api/orders-api.service";

async function createOrder(ingredients) {
  const { order, name } = await postOrder({ ingredients });

  return { ...order, name };
}

export { createOrder };
