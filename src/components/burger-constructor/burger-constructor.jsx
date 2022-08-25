import { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";

import { createOrderThunk } from "../../services/reducers/orders-reducer";
import {
  addIngredient,
  removeIngredient,
} from "../../services/reducers/ingredients-reducer";

import style from "./burger-constructor.module.css";

function BurgerConstructor(props) {
  const {
    items: ingredients,
    selectedItems,
    selectedBun: bun,
  } = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(payload) {
      onDropHandler(payload);
    },
  });

  const [{ isDrag }, draggableIngredient] = useDrag({
    type: "ingredient1",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const onDropHandler = ({ ingredient }) => {
    if (!ingredient) {
      return;
    }

    if (ingredient.type === INGREDIENT_TYPES.BUN) {
      dispatch(ingredient);
    }

    dispatch(addIngredient(ingredient));
  };

  const handlerCreateOrderClick = async () => {
    if (!selectedItems || selectedItems.length === 0) {
      return;
    }

    const orderContent = selectedItems.map((item) => item._id);

    if (bun) {
      orderContent.push(bun._id);
    }

    dispatch(createOrderThunk(orderContent));
    props.onOrderCreateClick();
  };

  const onIngredientDelete = (index) => {
    dispatch(removeIngredient(index));
  };

  const totalPrice = useMemo(() => {
    return selectedItems.reduce(
      (acc, curr) => acc + curr.price,
      bun?.price * 2 || 0
    );
  }, [selectedItems, bun]);

  const selectedIngredients = useMemo(() => {
    return selectedItems
      .filter((item) => item.type !== INGREDIENT_TYPES.BUN)
      .map((item, index) => (
        <div className={style.position} key={index} draggable ref={draggableIngredient}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => onIngredientDelete(index)}
          />
        </div>
      ));
  }, [selectedItems, props]);

  return (
    <div
      className={getClassName(style["burger-constructor"], "mt-25")}
      ref={dropTarget}
    >
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
