import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";
import { getClassName } from "../../utils";

import { LoginData } from "../../models";
import { loginThunk } from "../../services/reducers/auth-reducer";
import styles from "./login.page.module.css";

export default function Login() {
  const [values, inputChange] = useForm<LoginData>({
    email: "",
    password: "",
  });

  const { loggedIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const { state } = useLocation();
  const login = () => {
    dispatch(loginThunk({ ...values }));
  };

  if (loggedIn) {
    return <Redirect to={(state as any)?.from || "/"} />;
  }

  return (
    <div className={styles["login-page"]}>
      <h2 className={styles["login-page__title"]}>Войти</h2>

      <form>
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
      </form>

      <div className={getClassName(styles["login-page__button"], "pt-6")}>
        <Button type="primary" size="medium" onClick={login}>
          Войти
        </Button>
      </div>

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
