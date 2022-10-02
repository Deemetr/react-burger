import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IngredientType } from "../../enums";
import { setCurrentTab } from "../../services/reducers/tabs-reducer";
import style from "./tab-container.module.css";

function TabContainer({ tabsRef }: { tabsRef: RefObject<HTMLDivElement> }) {
  const dispatch = useDispatch();

  const onTabClick = (tabName: string) => {
    dispatch(setCurrentTab(tabName));
  };

  const currentTab: IngredientType = useSelector(
    (store: any) => store.tabs.currentTab
  );

  return (
    <div className={style["tab-container"]} ref={tabsRef}>
      <Tab
        value={IngredientType.BUN}
        active={currentTab === IngredientType.BUN}
        onClick={onTabClick}
      >
        Булки
      </Tab>
      <Tab
        value={IngredientType.SAUCE}
        active={currentTab === IngredientType.SAUCE}
        onClick={onTabClick}
      >
        Соусы
      </Tab>
      <Tab
        value={IngredientType.MAIN}
        active={currentTab === IngredientType.MAIN}
        onClick={onTabClick}
      >
        Начинка
      </Tab>
    </div>
  );
}

export default TabContainer;
