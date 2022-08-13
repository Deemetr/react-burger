import { API_BASE_PATH } from "../../constants";

async function fetchIngredients() {
  return fetch(`${API_BASE_PATH}/ingredients`).then((response) =>
    response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
  );
}

export { fetchIngredients };
