import { Link, Redirect } from "react-router-dom";

import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";
import { getClassName } from "../../utils";

import styles from "./forgot-password.page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordResetThunk } from "../../services/reducers/auth-reducer";

export default function ForgotPasswordPage() {
  const [ values, inputChange ] = useForm({
    email: "",
  });

  const { resetLinkSent, loggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const requestResetLink = () => {
    dispatch(requestPasswordResetThunk(values["email"]));
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  if (resetLinkSent) {
    return <Redirect to="/reset-password"></Redirect>;
  }

  return (
    <div className={styles["forgot-password-page"]}>
      <h2 className={styles["forgot-password__title"]}>
        Восстановление пароля
      </h2>

      <form>
        <EmailInput
          onChange={inputChange}
          value={values["email"]}
          name={"email"}
        />
      </form>

      <div className={getClassName(styles["forgot-password__button"], "pt-6")}>
        <Button type="primary" size="medium" onClick={requestResetLink}>
          Восстановить
        </Button>
      </div>

      <div className={styles["forgot-password__new-user"]}>
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
