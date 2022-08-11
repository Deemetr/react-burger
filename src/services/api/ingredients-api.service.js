import { API_BASE_PATH } from "../../constants";

async function fetchIngredients() {
  try {
    const response = await fetch(`${API_BASE_PATH}/ingredients`);
    const json = await response.json();

    if (!json.success) {
      return [];
    }

    return json.data;
  } catch (error) {
    console.error("Что-то пошло не так...\r\n", error);
    return [];
  }
}

export { fetchIngredients };
