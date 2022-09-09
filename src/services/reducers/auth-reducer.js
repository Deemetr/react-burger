import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  login,
  logout,
  refreshToken,
  getUser,
  requestPasswordReset,
  resetPassword,
} from "../api/auth.api.service";

import { setCookie, deleteCookie, getCookie } from "../../utils";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  registerUser
);
export const loginThunk = createAsyncThunk("auth/login", login);
export const logoutThunk = createAsyncThunk("auth/logout", logout);
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  refreshToken
);
export const getUserThunk = createAsyncThunk("auth/getUser", getUser);
export const requestPasswordResetThunk = createAsyncThunk(
  "auth/requestResetPassword",
  requestPasswordReset
);
export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  resetPassword
);

const setUserData = (state, payload) => {
  state.loggedIn = true;
  if (!payload) {
    return;
  }

  state.user = { name: payload.user.name, email: payload.user.email };
};

const updateState = (state, { payload }) => {
  if (!!payload.user) {
    setUserData(state, payload);
  }

  setCookie("token", payload.accessToken);
  sessionStorage.setItem("refreshToken", payload.refreshToken);
};

const clearState = (state, _) => {
  state.accessToken = null;
  state.refreshToken = null;
  state.user = {
    name: "",
    email: "",
    password: "",
  };

  state.loggedIn = false;

  deleteCookie("token");
  sessionStorage.removeItem("refreshToken");
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "",
      email: "",
      password: "",
    },
    loggedIn: !!getCookie("token"),
    resetLinkSent: false,
    passwordReset: false,
  },
  reducers: {},
  extraReducers: {
    [registerUserThunk.fulfilled]: updateState,
    [loginThunk.fulfilled]: updateState,
    [refreshTokenThunk.fulfilled]: updateState,
    [logoutThunk.fulfilled]: clearState,
    [getUserThunk.fulfilled]: (state, { payload }) =>
      setUserData(state, payload),
    [requestPasswordResetThunk.fulfilled]: (state) => {
      state.resetLinkSent = true;
      state.passwordReset = false;
    },
    [resetPasswordThunk.fulfilled]: (state, action) => {
      state.resetLinkSent = false;
      state.passwordReset = true;
    },
  },
});

export default authSlice.reducer;
