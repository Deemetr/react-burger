import React, { useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";

import { BurgerConstructorContext } from "../../contexts/burger-constructor.context";
import { IngredientsContext } from "../../contexts/ingredients.context";

import { createOrder } from "../../services";

import style from "./burger-constructor.module.css";

function BurgerConstructor(props) {
  const [state, setState] = useContext(BurgerConstructorContext);
  const ingredients = useContext(IngredientsContext);

  const [topBun, setTopBun] = React.useState(null);
  const [bottomBun, setBottomBun] = React.useState(null);

  useEffect(() => {
    const bun = state.selected.find(
      (item) => item.type === INGREDIENT_TYPES.BUN
    );
    setBuns(bun);
  }, [state.selected]);

  useEffect(() => {
    if (ingredients.length === 0) {
      return;
    }

    const [buns, sauces, main] = ingredients;
    const middle = [...main.items.slice(0, 2), ...sauces.items.slice(0, 2)];

    setState({
      ...state,
      ...{ selected: [...middle, buns.items[0]] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  const setBuns = (ingredient) => {
    if (!ingredient) {
      return;
    }

    setBottomBun({ ...ingredient, name: `${ingredient.name} (низ)` });
    setTopBun({ ...ingredient, name: `${ingredient.name} (верх)` });
  };

  const handlerCreateOrderClick = async () => {
    try {
      const response = await createOrder(
        state.selected.map((item) => item._id)
      );
      setState({ ...state, orderId: response.order.number });
      props.onOrderCreateClick();
    } catch (error) {
      console.log("Что-то пошло не так....", error);
    }
  };

  const totalPrice = useMemo(() => {
    return state.selected.reduce(
      (acc, curr) =>
        acc +
        (curr.type === INGREDIENT_TYPES.BUN ? curr.price * 2 : curr.price),
      0
    );
  }, [state.selected]);

  const selectedIngredients = useMemo(() => {
    return state.selected
      .filter((item) => item.type !== INGREDIENT_TYPES.BUN)
      .map((item, index) => (
        <div className={style.position} key={item.name}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={item.type === INGREDIENT_TYPES.BUN}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => props.onIngredientDelete(index)}
          />
        </div>
      ));
  }, [state.selected, props]);

  return (
    <div className={getClassName(style["burger-constructor"], "mt-25")}>
      <div className={style.position}>
        {topBun && (
          <ConstructorElement
            type="top"
            isLocked="true"
            text={topBun.name}
            price={topBun.price}
            thumbnail={topBun.image}
          />
        )}
      </div>
      <div className={style.middle}>{selectedIngredients}</div>
      <div className={style.position}>
        {bottomBun && (
          <ConstructorElement
            type="bottom"
            isLocked="true"
            text={bottomBun.name}
            price={bottomBun.price}
            thumbnail={bottomBun.image}
            className={style.position}
          />
        )}
      </div>

      <div className={getClassName(style.summary, "mt-10")}>
        <p className="mr-10">
          <span className="text text_type_digits-medium">{totalPrice}</span>
          &nbsp;
          <CurrencyIcon type="primary" />
        </p>

        <Button onClick={handlerCreateOrderClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  onOrderCreateClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
