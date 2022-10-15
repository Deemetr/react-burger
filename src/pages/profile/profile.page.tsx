import { useEffect } from "react";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";

import {
  getUserThunk,
  updateUserThunk
} from "../../services/reducers/auth-reducer";

import ProfileNav from "../../components/profile-nav/profile-nav";
import { User } from "../../models";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import styles from "./profile.page.module.css";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [values, onChange, setValues] = useForm<User>({
    name: user.name,
    login: user.email,
    password: user.password,
  });

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
      <ProfileNav />

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
