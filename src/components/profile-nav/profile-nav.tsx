import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { logoutThunk } from "../../services/reducers/auth-reducer";
import { getClassName } from "../../utils";
import styles from "./profile-nav.module.css";

export default function ProfileNav() {
  const dispatch = useDispatch<any>();
  const logout = () => {
    dispatch(logoutThunk());
  };

  return (
    <ul className={getClassName(styles.navigation, "mr-15")}>
      <li className={styles["item"]}>
        <NavLink
          to="/profile"
          className="text text_type_main-medium text_color_inactive"
          activeClassName="text text_type_main-medium"
        >
          Профиль
        </NavLink>
      </li>
      <li className={styles["item"]}>
        <NavLink
          to="/profile/orders"
          className="text text_type_main-medium text_color_inactive"
          activeClassName="text text_type_main-medium"
        >
          История заказов
        </NavLink>
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
  );
}
