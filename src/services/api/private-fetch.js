import { API_BASE_PATH } from "../../constants";
import { checkResponse, setCookie, getCookie } from "../../utils";

const saveTokens = (refreshToken, accessToken) => {
  setCookie("token", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);
};

const refreshTokenRequest = async () => {
  return fetch(`${API_BASE_PATH}/auth/token `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: sessionStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const _options = {
      ...options,
      ...{
        headers: { ...options["headers"], Authorization: getCookie("token") },
      },
    };

    const response = await fetch(url, _options);
    return await checkResponse(response);
  } catch (err) {
    if (err.message === "jwt expired") {
      const { refreshToken, accessToken } = await refreshTokenRequest();
      saveTokens(refreshToken, accessToken);

      options.headers.Authorization = accessToken;

      const res = await fetch(url, options);

      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export default fetchWithRefresh;
