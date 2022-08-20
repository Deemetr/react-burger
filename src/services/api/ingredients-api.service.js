import { API_BASE_PATH } from "../../constants";
import { checkResponse } from '../../utils'

async function fetchIngredients() {
  return fetch(`${API_BASE_PATH}/ingredients`).then(checkResponse);
}

export { fetchIngredients };
