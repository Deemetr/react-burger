import { postOrder } from "./api/orders-api.service";

async function createOrder(ingredients: string[]) {
  const { order, name } = await postOrder({ ingredients });

  return { ...order, name };
}

export { createOrder };

