import { useDispatch, useSelector } from "react-redux";

import TabContainer from "../tab-container/tab-container";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { getClassName } from "../../utils";

import style from "./burger-ingredients.module.css";
import { useEffect, useRef } from "react";
import { INGREDIENT_TYPES } from "../../constants";

import { setCurrentTab } from "../../services/reducers/tabs-reducer";

function BurgerIngredients(props) {
  const refs = {
    [INGREDIENT_TYPES.BUN]: useRef(null),
    [INGREDIENT_TYPES.MAIN]: useRef(null),
    [INGREDIENT_TYPES.SAUCE]: useRef(null),
  };

  const ingredients = useSelector((state) => state.ingredients.items);
  const currentTab = useSelector((store) => store.tabs.currentTab);

  const { onTabClick, ...other } = props;

  const groupsContainer = useRef(null);
  const tabsContainer = useRef(null);

  const dispatch = useDispatch();

  // eslint-disable-next-line
  const handleScroll = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const buns = refs[INGREDIENT_TYPES.BUN];
    const main = refs[INGREDIENT_TYPES.MAIN];
    const sauces = refs[INGREDIENT_TYPES.SAUCE];

    const { bottom: tabsBottom } =
      tabsContainer.current.getBoundingClientRect();

    const { bottom: bunsBottom } = buns.current.getBoundingClientRect();
    const { bottom: mainBottom } = main.current.getBoundingClientRect();
    const { bottom: saucesBottom } = sauces.current.getBoundingClientRect();

    const distances = [
      { type: INGREDIENT_TYPES.BUN, distance: bunsBottom - tabsBottom },
      { type: INGREDIENT_TYPES.SAUCE, distance: saucesBottom - tabsBottom },
      { type: INGREDIENT_TYPES.MAIN, distance: mainBottom - tabsBottom },
    ].filter((item) => item.distance > 0);

    const closest = distances.reduce(
      (previos, current) =>
        previos.distance > current.distance ? current : previos,
      distances[0]
    );

    dispatch(setCurrentTab(closest.type));
  };

  useEffect(() => {
    const container = groupsContainer.current;

    if (!container || !tabsContainer) {
      return;
    }

    container.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [groupsContainer, tabsContainer, handleScroll]);

  useEffect(() => {
    try {
      if (!currentTab) {
        return;
      }

      refs[currentTab]?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert("Что-то пошло не так...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <div className={getClassName(style["burger-ingredients-wrapper"], "mt-10")}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <TabContainer onTabClick={onTabClick} tabsRef={tabsContainer} />

      <div className={style.groups} ref={groupsContainer}>
        {ingredients?.map((group) => (
          <IngredientsGroup
            title={group.title}
            ingredients={group.items}
            key={group.title}
            groupRef={refs[group.type]}
            {...other}
          />
        ))}
      </div>
    </div>
  );
}

export default BurgerIngredients;
