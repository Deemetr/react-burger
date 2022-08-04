import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './user-profile.module.css';

function UserProfile() {
  const componentClass = `${style['user-profile']} mt-4 mb-4 ml-5 mr-5`
  
  return (
    <div className={componentClass}>
      <ProfileIcon type="secondary"/>
      <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
    </div>
  );
}

export default UserProfile;
