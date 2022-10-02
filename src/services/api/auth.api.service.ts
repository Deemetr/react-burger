import { API_BASE_PATH } from "../../constants";
import { LoginData, ResetPasswordRequest, User } from "../../models";
import { checkResponse, getCookie } from "../../utils";
import privateFetch from "./private-fetch";

export async function registerUser(user: User) {
  return fetch(`${API_BASE_PATH}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  }).then(checkResponse);
}

export async function login(user: LoginData) {
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

export async function requestPasswordReset(email: string) {
  return fetch(`${API_BASE_PATH}/password-reset `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),
  }).then(checkResponse);
}

export async function resetPassword(data: ResetPasswordRequest) {
  return fetch(`${API_BASE_PATH}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export async function refreshToken(refreshToken: string) {
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
    },
  });
}

export async function updateUser(user: User) {
  return privateFetch(`${API_BASE_PATH}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
}

export async function patchUser(user: User) {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json;charset=utf-8");
  requestHeaders.set("Authorization", getCookie("token"));

  return fetch(`${API_BASE_PATH}/auth/user`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(user),
  }).then(checkResponse);
}
