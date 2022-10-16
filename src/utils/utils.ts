import { TokenPayload } from "../models";

function getClassName(...classNames: string[]): string {
  return classNames.join(" ");
}

function isTokenExpired(token: string) {
  if (!token) {
    return true;
  }

  const [, payload, _] = token.split(".");

  const tokenPayload: TokenPayload = JSON.parse(atob(payload));

  return Math.floor(new Date().getTime() / 1000) > tokenPayload.exp;
}

export { getClassName, isTokenExpired };

