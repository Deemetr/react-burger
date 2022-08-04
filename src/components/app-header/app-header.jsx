import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import Menu from "../menu/menu";
import UserProfile from "../user-profile/user-profile";
import style from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={`${style.header} pt-5 pb-5 pl-3 pr-3 content`}>
      <Menu />
      <div className={style['logo-wrapper']}>
        <Logo />
      </div>
      <UserProfile />
    </header>
  );
}

export default AppHeader;
