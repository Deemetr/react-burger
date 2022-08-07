import PropTypes from 'prop-types';

import TabContainer from "../tab-container/tab-container";
import IngredientCard from "../ingredient-card/ingredient-card";
import ingredients from "../../mocks/ingredients";
import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";

import style from "./burger-ingredients.module.css";

function BurgerIngredients(props) {
  return (
    <div className={getClassName(style["burger-ingredients-wrapper"], "mt-10")}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <TabContainer />

      <div className={style.groups}>
        <div className="group mb-10 mt-10">
          <h3 className="group__title text text_type_main-medium mb-6">
            Булки
          </h3>
          <div className={style["ingredients__list"]}>
            {ingredients
              .filter((item) => item.type === INGREDIENT_TYPES.BUN)
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  className="list-item"
                  onClick={props.onIngredientClick}
                  count={props.counters.get(item._id) || 0}
                />
              ))}
          </div>
        </div>

        <div className="group mb-10">
          <h3 className="text text_type_main-medium mb-6">Соусы</h3>
          <div className={style["ingredients__list"]}>
            {ingredients
              .filter((item) => item.type === INGREDIENT_TYPES.SAUCE)
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  className="list-item"
                  onClick={props.onIngredientClick}
                  count={props.counters.get(item._id) || 0}
                />
              ))}
          </div>
        </div>

        <div className="group mb-10">
          <h3 className="text text_type_main-medium mb-6">Начинка</h3>
          <div className={style["ingredients__list"]}>
            {ingredients
              .filter((item) => item.type === INGREDIENT_TYPES.MAIN)
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  className="list-item"
                  onClick={props.onIngredientClick}
                  count={props.counters.get(item._id) || 0}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  counters: PropTypes.instanceOf(Map),
  onIngredientClick: PropTypes.func.isRequired,
}; 

export default BurgerIngredients;
