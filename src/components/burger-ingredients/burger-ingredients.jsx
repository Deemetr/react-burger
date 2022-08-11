import PropTypes from "prop-types";

import TabContainer from "../tab-container/tab-container";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { getClassName } from "../../utils";

import style from "./burger-ingredients.module.css";

function BurgerIngredients(props) {
  const { ingredientGroups, ...otherProps } = props;
  debugger;
  return (
    <div className={getClassName(style["burger-ingredients-wrapper"], "mt-10")}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <TabContainer />

      <div className={style.groups}>
        {ingredientGroups.map((group) => (
          <IngredientsGroup
            title={group.title}
            ingredients={group.items}
            key={group.title}
            {...otherProps}
          />
        ))}
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  counters: PropTypes.instanceOf(Map),
  onIngredientClick: PropTypes.func.isRequired,
  ingredientGroups: PropTypes.array.isRequired,
};

export default BurgerIngredients;
