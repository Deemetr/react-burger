import { Link, Redirect } from "react-router-dom";

import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";
import { getClassName } from "../../utils";

import styles from "./reset-password.page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk } from "../../services/reducers/auth-reducer";

export default function ResetPasswordPage() {
  const { passwordReset, loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [values, inputChange] = useForm({
    token: "",
    password: "",
  });

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  if (passwordReset) {
    return <Redirect to="/login" />;
  }

  const resetPassword = () => {
    dispatch(resetPasswordThunk(values));
  };

  return (
    <div className={styles["reset-password-page"]}>
      <h2 className={styles["reset-password-page__title"]}>
        Восстановление пароля
      </h2>

      <form>
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
      </form>

      <div
        className={getClassName(styles["reset-password-page__button"], "pt-6")}
      >
        <Button type="primary" size="medium" onClick={resetPassword}>
          Сохранить
        </Button>
      </div>

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
