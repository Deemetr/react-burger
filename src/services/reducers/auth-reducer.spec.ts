import { User } from "../../models";
import authReducer, {
   getUserThunk,
   initialState,
   loginThunk,
   logoutThunk,
   registerUserThunk,
   requestPasswordResetThunk,
   resetPasswordThunk,
   updateUserThunk
} from "./auth-reducer";

const user: User = { login: "login", name: "name", password: "password" };
const userResponse = {
  refreshToken: "",
  accessToken: "",
  user: { name: user.name, email: user.login },
};
const expectedUserData = { name: user.name, email: user.login, password: "" };

describe("Auth reducer", () => {
  it("should return initial state", () => {
    expect(
      authReducer({ ...initialState }, { type: "DOES_NOT_EXISTED_ACTION" })
    ).toEqual(initialState);
  });

  it("should register user", () => {
    const action = registerUserThunk.fulfilled(userResponse, "", user);

    const actualState = authReducer(initialState, action);

    expect(actualState.user).toEqual(expectedUserData);
  });

  it("should login user", () => {
    const action = loginThunk.fulfilled(userResponse, "", {
      email: user.login,
      password: user.password,
    });

    const actualState = authReducer(initialState, action);

    expect(actualState.user).toEqual(expectedUserData);
  });

  it("should logout user", () => {
    const action = logoutThunk.fulfilled("", "");

    const actualState = authReducer(initialState, action);

    expect(actualState.loggedIn).toBe(false);
  });

  it("should get user data", () => {
    const action = getUserThunk.fulfilled(userResponse, "");

    const actualState = authReducer(initialState, action);

    expect(actualState.user).toEqual(expectedUserData);
  });

  it("should make password change request", () => {
    const action = requestPasswordResetThunk.fulfilled("", "", "");

    const actualState = authReducer(initialState, action);

    expect(actualState.resetLinkSent).toBe(true);
    expect(actualState.passwordReset).toBe(false);
  });

  it("should reset password", () => {
    const action = resetPasswordThunk.fulfilled("", "", "");

    const actualState = authReducer(initialState, action);

    expect(actualState.resetLinkSent).toBe(false);
    expect(actualState.passwordReset).toBe(true);
  });

  it("should update user data", () => {
    const action = updateUserThunk.fulfilled(userResponse, "", user);

    const actualState = authReducer(initialState, action);

    expect(actualState.user).toEqual(expectedUserData);
  });
});
