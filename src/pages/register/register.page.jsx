import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";
import { getClassName } from "../../utils";

import styles from "./register.page.module.css";

import { registerUserThunk } from "../../services/reducers/auth-reducer";

export default function RegisterPage() {
  const [values, inputChange] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const registerUser = () => {
    dispatch(
      registerUserThunk({
        ...values,
      })
    );
  };

  return (
    <div className={styles["register-page"]}>
      <h2 className={styles["register-page__title"]}>Регистрация</h2>

      <form>
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={inputChange}
          value={values["name"]}
          name={"name"}
          size={"default"}
        />

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

      <div className={getClassName(styles["register-page__button"], "pt-6")}>
        <Button type="primary" size="medium" onClick={registerUser}>
          Зарегистрироваться
        </Button>
      </div>

      <div className={getClassName(styles["register-page__login"], "pt-4")}>
        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
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
