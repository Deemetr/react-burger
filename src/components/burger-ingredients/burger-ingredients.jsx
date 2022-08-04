import TabContainer from "../tab-container/tab-container";
import IngredientCard from "../ingredient-card/ingredient-card";
import ingredients from "../../mocks/ingredients";
import { INGREDIENT_TYPES } from "../../constants";

import "./burger-ingredients.css";

function BurgerIngredients(props) {
  return (
    <div className="burger-ingredients-wrapper ingredients mt-10">
      <h2 className="ingredients__title text text_type_main-large mb-5">
        Соберите бургер
      </h2>
      <TabContainer />

      <div className="groups">
        <div className="group mb-10 mt-10">
          <h3 className="group__title text text_type_main-medium mb-6">
            Булки
          </h3>
          <div className="ingredients__list">
            {ingredients
              .filter((item) => item.type === INGREDIENT_TYPES.BUN)
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  className="list-item"
                  onClick={props.onIngredientClick}
                />
              ))}
          </div>
        </div>

        <div className="group mb-10">
          <h3 className="group__title text text_type_main-medium mb-6">
            Соусы
          </h3>
          <div className="ingredients__list">
            {ingredients
              .filter((item) => item.type === INGREDIENT_TYPES.SAUCE)
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  className="list-item"
                  onClick={props.onIngredientClick}
                />
              ))}
          </div>
        </div>

        <div className="group mb-10">
          <h3 className="group__title text text_type_main-medium mb-6">
            Начинка
          </h3>
          <div className="ingredients__list">
            {ingredients
              .filter((item) => item.type === INGREDIENT_TYPES.MAIN)
              .map((item) => (
                <IngredientCard
                  key={item._id}
                  ingredient={item}
                  className="list-item"
                  onClick={props.onIngredientClick}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;