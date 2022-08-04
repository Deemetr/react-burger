import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_TYPES, INGRIDIENT_POSITION } from "../../constants";

import "./burger-constructor.css";

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

function BurgerConstructor(props) {
  const defineType = (ingredient, index) => {
    if (index === 0 && ingredient.type === INGREDIENT_TYPES.BUN) {
      return INGRIDIENT_POSITION.TOP;
    }

    if (ingredient.type === INGREDIENT_TYPES.BUN) {
      return INGRIDIENT_POSITION.BOTTOM;
    }

    return undefined;
  };

  return (
    <div className="burger-constructor mt-25 d-flex flex-column">
      {props.selectedIngredients.map((item, index) => (
        <div
          className="burger-constructor__position d-flex align-items-center"
          key={index}
        >
          {item.type !== INGREDIENT_TYPES.BUN && (
            <DragIcon type="primary" />
          )}
          <ConstructorElement
            type={defineType(item, index)}
            isLocked={item.type === INGREDIENT_TYPES.BUN}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => props.onIngredientDelete(index)}
          />
        </div>
      ))}

      <div className="summary d-flex align-items-center mt-10">
        <p className="mr-10">
          <span className="text text_type_digits-medium">
            {props.selectedIngredients.reduce(
              (acc, curr) => acc + curr.price,
              0
            )}
          </span>
          &nbsp;
          <CurrencyIcon type="primary" />
        </p>

        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
