import { NavLink } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  MenuIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getClassName } from "../../utils";
import style from "./menu.module.css";

function Menu() {
  return (
    <nav className="menu">
      <ul className={style["menu-list"]}>
        <li className="menu-list__item mr-5 ml-5 mt-4 mb-4">
          <NavLink
            to="/"
            className={getClassName(
              style["burger-link"],
              "text text_color_inactive "
            )}
            activeClassName={getClassName(
              style["burger-link"],
              "text text_type_main-default"
            )}
          >
            <BurgerIcon type="primary" />
            <span className="ml-2">Контруктор</span>
          </NavLink>
        </li>
        <li className="menu-list__item mr-5 ml-5 mt-4 mb-4">
          <NavLink
            to="/feed"
            className={getClassName(
              style["burger-link"],
              "text text_color_inactive "
            )}
            activeClassName={getClassName(
              style["burger-link"],
              "text text_type_main-default"
            )}
          >
            <ListIcon type="secondary" />
            <span className="ml-2">Лента заказов</span>
          </NavLink>
        </li>
      </ul>
      <div className={`${style["menu-burger"]} mt-4 mr-5 mb-4 ml-5`}>
        <MenuIcon type="primary" />
      </div>
    </nav>
  );
}

export default Menu;
