import PropTypes from "prop-types";

import TabContainer from "../tab-container/tab-container";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { getClassName } from "../../utils";

import { useContext } from "react";

import style from "./burger-ingredients.module.css";

import { IngredientsContext } from "../../contexts/ingredients.context";

function BurgerIngredients(props) {
  const ingredients = useContext(IngredientsContext);

  const { onTabClick, currentTab, groupRefs, ...other } = props;

  return (
    <div className={getClassName(style["burger-ingredients-wrapper"], "mt-10")}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <TabContainer onTabClick={onTabClick} currentTab={currentTab} />

      <div className={style.groups}>
        {ingredients.map((group) => (
          <IngredientsGroup
            title={group.title}
            ingredients={group.items}
            key={group.title}
            groupRef={props.groupRefs[group.type]}
            {...other}
          />
        ))}
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  counters: PropTypes.instanceOf(Map),
  onIngredientClick: PropTypes.func.isRequired,
  onTabClick: PropTypes.func.isRequired,
  groupRefs: PropTypes.object.isRequired,
};

export default BurgerIngredients;
