import { API_BASE_PATH } from "../../constants";
import { checkResponse } from "../../utils";

async function postOrder(payload) {
  return fetch(`${API_BASE_PATH}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).then(checkResponse);
}

export { postOrder };
