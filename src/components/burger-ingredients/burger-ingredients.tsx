import { useEffect, useRef } from "react";

import { getClassName } from "../../utils";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import TabContainer from "../tab-container/tab-container";

import style from "./burger-ingredients.module.css";

import { IngredientType } from "../../enums";
import { IngredientGroup } from "../../models";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import { setCurrentTab } from "../../services/reducers/tabs-reducer";

function BurgerIngredients(props: any) {
  const refs = {
    [IngredientType.BUN]: useRef<HTMLDivElement>(null),
    [IngredientType.MAIN]: useRef<HTMLDivElement>(null),
    [IngredientType.SAUCE]: useRef<HTMLDivElement>(null),
  };

  const ingredients = useAppSelector((state) => state.ingredients.items);
  const currentTab: IngredientType = useAppSelector(
    (store) => store.tabs.currentTab
  );

  const groupsContainer = useRef<HTMLDivElement>(null);
  const tabsContainer = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  // eslint-disable-next-line
  const handleScroll = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const buns = refs[IngredientType.BUN];
    const main = refs[IngredientType.MAIN];
    const sauces = refs[IngredientType.SAUCE];

    if (tabsContainer.current === null) {
      return;
    }

    const { bottom: tabsBottom } =
      tabsContainer.current.getBoundingClientRect();

    if (
      buns.current === null ||
      main.current === null ||
      sauces.current === null
    ) {
      return;
    }

    const { bottom: bunsBottom } = buns.current.getBoundingClientRect();
    const { bottom: mainBottom } = main.current.getBoundingClientRect();
    const { bottom: saucesBottom } = sauces.current.getBoundingClientRect();

    const distances = [
      { type: IngredientType.BUN, distance: bunsBottom - tabsBottom },
      { type: IngredientType.SAUCE, distance: saucesBottom - tabsBottom },
      { type: IngredientType.MAIN, distance: mainBottom - tabsBottom },
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
      <TabContainer tabsRef={tabsContainer} />

      <div className={style.groups} ref={groupsContainer}>
        {ingredients?.map((group: IngredientGroup) => (
          <IngredientsGroup
            title={group.title}
            ingredients={group.items}
            key={group.title}
            groupRef={refs[group.type]}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}

export default BurgerIngredients;
