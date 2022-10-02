import { API_BASE_PATH } from "../../constants";
import { CreateOrderRequest, CreateOrderResponse } from "../../models";
import { checkResponse } from "../../utils";

async function postOrder(payload: CreateOrderRequest) {
  return fetch(`${API_BASE_PATH}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse<CreateOrderResponse>);
}

export { postOrder };

