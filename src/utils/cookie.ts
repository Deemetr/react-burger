import { CookieConfig } from "../models";

export function setCookie(
  name: string,
  value: string | null,
  config: CookieConfig
) {
  config = config || {};
  let exp = config.expires;

  if (isNumber(exp)) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = config.expires = d;
  }

  if (isDate(exp)) {
    config.expires = exp.toUTCString();
  }

  let updatedCookie = [`${name}=${encodeURIComponent(value || "")}`]
    .concat(Object.entries(config).map(([key, value]) => `${key}=${value}`))
    .join(";");

  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  setCookie(name, null, { expires: -1 });
}

function isDate(object: any): object is Date {
  return object && "toUTCString" in object;
}

function isNumber(object: any): object is number {
  return object && typeof object == "number";
}
