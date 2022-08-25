import { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";

import { createOrderThunk } from "../../services/reducers/orders-reducer";

import style from "./burger-constructor.module.css";

function BurgerConstructor(props) {
  const selected = useSelector((store) => store.ingredients.selectedItems);
  const bun = useSelector((store) => store.ingredients.selectedBun);
  const dispatch = useDispatch();

  const handlerCreateOrderClick = async () => {
    if (!selected || selected.length === 0) {
      return;
    }

    dispatch(createOrderThunk(selected.map((item) => item._id)));
    props.onOrderCreateClick();
  };

  const totalPrice = useMemo(() => {
    return selected.reduce(
      (acc, curr) =>
        acc +
        (curr.type === INGREDIENT_TYPES.BUN ? curr.price * 2 : curr.price),
      0
    );
  }, [selected]);

  const selectedIngredients = useMemo(() => {
    return selected
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
  }, [selected, props]);

  return (
    <div className={getClassName(style["burger-constructor"], "mt-25")}>
      <div className={style.position}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked="true"
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <div className={style.middle}>{selectedIngredients}</div>
      <div className={style.position}>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked="true"
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
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
