import { Link, Redirect } from "react-router-dom";

import {
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import React from "react";
import { useForm } from "../../hooks/useForm";
import { ForgotPasswordData } from "../../models";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import { requestPasswordResetThunk } from "../../services/reducers/auth-reducer";
import { getClassName } from "../../utils";
import styles from "./forgot-password.page.module.css";
export default function ForgotPasswordPage() {
  const [values, inputChange] = useForm<ForgotPasswordData>({
    email: "",
  });

  const { resetLinkSent } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const requestResetLink = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    debugger;
    dispatch(requestPasswordResetThunk((values as ForgotPasswordData).email));
  };

  if (resetLinkSent) {
    return (
      <>
        <Redirect to="/reset-password"></Redirect>
      </>
    );
  }

  return (
    <div className={styles["forgot-password-page"]}>
      <h2 className={styles["forgot-password__title"]}>
        Восстановление пароля
      </h2>

      <form onSubmit={requestResetLink}>
        <EmailInput
          onChange={inputChange}
          value={values.email}
          name={"email"}
        />

        <div
          className={getClassName(styles["forgot-password__button"], "pt-6")}
        >
          <Button type="primary" size="medium" htmlType="submit">
            Восстановить
          </Button>
        </div>
      </form>

      <div className={styles["forgot-password__new-user"]}>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Link className={"test"} to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
}
