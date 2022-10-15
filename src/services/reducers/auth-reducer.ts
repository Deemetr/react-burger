import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  login,
  logout,
  refreshToken,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updateUser
} from "../api/auth.api.service";

import { deleteCookie, getCookie, setCookie } from "../../utils";

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
export const updateUserThunk = createAsyncThunk("auth/updateUser", updateUser);

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthStore {
  user: User;
  loggedIn: boolean;
  resetLinkSent: boolean;
  passwordReset: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const setUserData = (state: AuthStore, payload: { user: User }) => {
  state.loggedIn = true;
  if (!payload) {
    return;
  }

  state.user = {
    name: payload.user.name,
    email: payload.user.email,
    password: "",
  };
};

const updateState = (
  state: AuthStore,
  {
    payload,
  }: { payload: { accessToken: string; refreshToken: string; user: User } }
) => {
  if (!!payload.user) {
    setUserData(state, payload);
  }

  setCookie("token", payload.accessToken);
  sessionStorage.setItem("refreshToken", payload.refreshToken);
};

const clearState = (state: AuthStore) => {
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

const initialState: AuthStore = {
  user: {
    name: "",
    email: "",
    password: "",
  },
  loggedIn: !!getCookie("token"),
  resetLinkSent: false,
  passwordReset: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUserThunk.fulfilled.toString()]: updateState,
    [loginThunk.fulfilled.toString()]: updateState,
    [refreshTokenThunk.fulfilled.toString()]: updateState,
    [logoutThunk.fulfilled.toString()]: clearState,
    [getUserThunk.fulfilled.toString()]: (state, { payload }) =>
      setUserData(state, payload),
    [requestPasswordResetThunk.fulfilled.toString()]: (state) => {
      debugger;
      state.resetLinkSent = true;
      state.passwordReset = false;
    },
    [resetPasswordThunk.fulfilled.toString()]: (state, action) => {
      state.resetLinkSent = false;
      state.passwordReset = true;
    },
    [updateUserThunk.fulfilled.toString()]: (state, { payload }) =>
      setUserData(state, payload),
  },
});

export default authSlice.reducer;
