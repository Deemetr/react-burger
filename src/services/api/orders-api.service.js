import { API_BASE_PATH } from "../../constants";

async function postOrder(payload) {
  return fetch(`${API_BASE_PATH}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
  );
}

export { postOrder };
