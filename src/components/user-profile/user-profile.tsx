import { NavLink } from "react-router-dom";

import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./user-profile.module.css";

function UserProfile() {
  const componentClass = `${style["user-profile"]} mt-4 mb-4 ml-5 mr-5`;
  const componentClassActive = `${componentClass} text text_type_main-default`;
  const componentClassInactive = `${componentClassActive} text_color_inactive`;

  return (
    <NavLink
      className={componentClassInactive}      
      activeClassName={componentClassActive}
      to="/profile"
    >
      <ProfileIcon type="secondary" />
      <span className=" ml-2">Личный кабинет</span>
    </NavLink>
  );
}

export default UserProfile;
