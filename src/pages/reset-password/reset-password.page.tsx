import { Link, Redirect } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";
import { getClassName } from "../../utils";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import { resetPasswordThunk } from "../../services/reducers/auth-reducer";
import styles from "./reset-password.page.module.css";

export default function ResetPasswordPage() {
  const { passwordReset } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [values, inputChange] = useForm({
    token: "",
    password: "",
  });

  if (passwordReset) {
    return <Redirect to="/login" />;
  }

  const resetPassword = (event: React.FormEvent) => {
    event.stopPropagation();
    event.preventDefault();

    dispatch(resetPasswordThunk(values));
  };

  return (
    <div className={styles["reset-password-page"]}>
      <h2 className={styles["reset-password-page__title"]}>
        Восстановление пароля
      </h2>

      <form onSubmit={resetPassword}>
        <PasswordInput
          onChange={inputChange}
          value={values["password"]}
          name={"password"}
        />

        <Input
          type={"text"}
          placeholder="Введите код из письма"
          onChange={inputChange}
          value={values["token"]}
          name={"token"}
          size={"default"}
        />

        <div
          className={getClassName(
            styles["reset-password-page__button"],
            "pt-6"
          )}
        >
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>

      <div className={styles["reset-password-page__new-user"]}>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Link
          className={getClassName(styles.link, "text text_type_main-default")}
          to="/login"
        >
          &nbsp;Войти
        </Link>
      </div>
    </div>
  );
}
