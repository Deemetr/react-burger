import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_TYPES } from "../../constants";

import style from "./tab-container.module.css";

function TabContainer(props) {
  return (
    <div className={style["tab-container"]}>
      <Tab
        value={INGREDIENT_TYPES.BUN}
        active={props.currentTab === INGREDIENT_TYPES.BUN}
        onClick={props.onTabClick}
      >
        Булки
      </Tab>
      <Tab
        value={INGREDIENT_TYPES.SAUCE}
        active={props.currentTab === INGREDIENT_TYPES.SAUCE}
        onClick={props.onTabClick}
      >
        Соусы
      </Tab>
      <Tab
        value={INGREDIENT_TYPES.MAIN}
        active={props.currentTab === INGREDIENT_TYPES.MAIN}
        onClick={props.onTabClick}
      >
        Начинка
      </Tab>
    </div>
  );
}

TabContainer.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  current: PropTypes.object,
};

export default TabContainer;
