import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getClassName } from "../../utils";
import { useForm } from "../../hooks/useForm";

import {
  getUserThunk,
  logoutThunk,
  updateUserThunk,
} from "../../services/reducers/auth-reducer";

import styles from "./profile.page.module.css";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [values, onChange, setValues] = useForm({
    name: user.name,
    login: user.email,
    password: user.password,
  });

  const logout = () => {
    dispatch(logoutThunk());
  };

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const updateUserData = () => {
    dispatch(updateUserThunk(values));
  };
  const resetUserData = () => {
    setValues({ name: user.name, login: user.email, password: user.password });
  };

  return (
    <div className={styles["profile-page"]}>
      <ul className={getClassName(styles.navigation, "mr-15")}>
        <li
          className={getClassName(styles["item"], "text text_type_main-medium")}
        >
          Профиль
        </li>
        <li
          className={getClassName(
            styles["item"],
            "text text_type_main-medium text_color_inactive"
          )}
        >
          История заказов
        </li>
        <li
          className={getClassName(
            styles["item"],
            "text text_type_main-medium text_color_inactive"
          )}
          onClick={logout}
        >
          Выход
        </li>
      </ul>

      <div className="user-data">
        <Input
          type={"text"}
          onChange={onChange}
          value={values["name"]}
          name="name"
          size={"default"}
          placeholder="Имя"
        />

        <EmailInput onChange={onChange} value={values["login"]} name="login" />
        <PasswordInput
          onChange={onChange}
          value={values["password"]}
          name="password"
        />

        <div className="d-flex mt-6">
          <Button type="secondary" size="medium" onClick={resetUserData}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={updateUserData}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
