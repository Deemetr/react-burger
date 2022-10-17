import { Link, Redirect, useLocation } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";
import { getClassName } from "../../utils";

import React from "react";
import { LoginData } from "../../models";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import { loginThunk } from "../../services/reducers/auth-reducer";
import styles from "./login.page.module.css";

export default function Login() {
  const [values, inputChange] = useForm<LoginData>({
    email: "",
    password: "",
  });

  const { loggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const login = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(loginThunk({ ...values }));
  };

  if (loggedIn) {
    return <Redirect to={(state as any)?.from || "/"} />;
  }

  return (
    <div className={styles["login-page"]}>
      <h2 className={styles["login-page__title"]}>Войти</h2>

      <form onSubmit={login}>
        <EmailInput
          onChange={inputChange}
          value={values["email"]}
          name={"email"}
        />

        <PasswordInput
          onChange={inputChange}
          value={values["password"]}
          name={"password"}
        />

        <div className={getClassName(styles["login-page__button"], "pt-6")}>
          <Button type="primary" size="medium" htmlType="submit">
            Войти
          </Button>
        </div>
      </form>

      <div className={styles["login__new-user"]}>
        <span className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </span>
        <Link
          className={getClassName(styles.link, "text text_type_main-default")}
          to="/register"
        >
          &nbsp;Зарегистрироваться
        </Link>
      </div>

      <div className={styles["login-page__new-user"]}>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </span>
        <Link
          className={getClassName(styles.link, "text text_type_main-default")}
          to="/forgot-password"
        >
          &nbsp;Восстановить пароль
        </Link>
      </div>
    </div>
  );
}
