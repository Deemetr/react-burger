import {
  BurgerIcon,
  MenuIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./menu.module.css";

function Menu() {
  return (
    <nav className="menu">
      <ul className={style["menu-list"]}>
        <li className="menu-list__item mr-5 ml-5 mt-4 mb-4">
          <a href="#" className={style["burger-link"]}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">Контруктор</span>
          </a>
        </li>
        <li className="menu-list__item mr-5 ml-5 mt-4 mb-4">
          <a href="#" className={style["burger-link"]}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </a>
        </li>
      </ul>
      <div className={`${style['menu-burger']} mt-4 mr-5 mb-4 ml-5`}>
        <MenuIcon />
      </div>
    </nav>
  );
}

export default Menu;
