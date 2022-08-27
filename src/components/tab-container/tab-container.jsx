import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_TYPES } from "../../constants";

import style from "./tab-container.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../../services/reducers/tabs-reducer";

function TabContainer(props) {
  const dispatch = useDispatch();

  const onTabClick = (tabName) => {
    dispatch(setCurrentTab(tabName));
  };

  const currentTab = useSelector((store) => store.tabs.currentTab);

  return (
    <div className={style["tab-container"]} ref={props.tabsRef}>
      <Tab
        value={INGREDIENT_TYPES.BUN}
        active={currentTab === INGREDIENT_TYPES.BUN}
        onClick={onTabClick}
      >
        Булки
      </Tab>
      <Tab
        value={INGREDIENT_TYPES.SAUCE}
        active={currentTab === INGREDIENT_TYPES.SAUCE}
        onClick={onTabClick}
      >
        Соусы
      </Tab>
      <Tab
        value={INGREDIENT_TYPES.MAIN}
        active={currentTab === INGREDIENT_TYPES.MAIN}
        onClick={onTabClick}
      >
        Начинка
      </Tab>
    </div>
  );
}

export default TabContainer;
