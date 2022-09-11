function checkResponse(response) {
  if (!response) {
    Promise.reject("Ответ от сервера пуст");
  }

  try {
    return response.ok
      ? response.json()
      : response.json().then((error) => Promise.reject(error));
  } catch (error) {
    Promise.reject(`Что-то пошло не так...`);
    console.error(error);
  }
}

export { checkResponse };
