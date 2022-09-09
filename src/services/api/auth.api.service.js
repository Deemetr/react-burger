import { API_BASE_PATH } from "../../constants";
import { checkResponse, getCookie } from "../../utils";
import privateFetch from "./private-fetch";

export async function registerUser(user) {
  return fetch(`${API_BASE_PATH}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  }).then(checkResponse);
}

export async function login(user) {
  return fetch(`${API_BASE_PATH}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  }).then(checkResponse);
}

export async function logout() {
  return fetch(`${API_BASE_PATH}/auth/logout `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: sessionStorage.getItem("refreshToken") }),
  }).then(checkResponse);
}

export async function requestPasswordReset(email) {
  return fetch(`${API_BASE_PATH}/password-reset `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),
  }).then(checkResponse);
}

export async function resetPassword(data) {
  return fetch(`${API_BASE_PATH}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export async function refreshToken(refreshToken) {
  return fetch(`${API_BASE_PATH}/auth/token `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
}

export async function getUser() {
  return privateFetch(`${API_BASE_PATH}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getCookie("token"),
    },
  });
}

export async function patchUser(user) {
  return fetch(`${API_BASE_PATH}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getCookie("token"),
    },
    body: JSON.stringify(user),
  }).then(checkResponse);
}
