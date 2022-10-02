import { API_BASE_PATH } from "../../constants";
import { Ingredient } from "../../models";
import { checkResponse } from "../../utils";

async function fetchIngredients() {
  return fetch(`${API_BASE_PATH}/ingredients`).then(
    checkResponse<{ data: Ingredient[] }>
  );
}

export { fetchIngredients };

