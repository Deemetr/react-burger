async function checkResponse<T>(response: Response): Promise<T | string> {
  if (!response) {
    Promise.reject("Ответ от сервера пуст");
  }

  try {
    return response.ok
      ? ((await response.json()) as T)
      : await response.json().then((error: string) => Promise.reject(error));
  } catch (error) {
    console.error(error);
    return Promise.reject(`Что-то пошло не так...`);
  }
}

export { checkResponse };

