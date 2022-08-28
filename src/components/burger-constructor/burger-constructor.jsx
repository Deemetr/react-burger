import { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getClassName } from "../../utils";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { createOrderThunk, setRequestOrder } from "../../services/reducers/orders-reducer";
import { addIngredient } from "../../services/reducers/ingredients-reducer";

import style from "./burger-constructor.module.css";

function BurgerConstructor(props) {
  const { selectedItems, selectedBun: bun } = useSelector(
    (store) => store.ingredients
  );
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(payload) {
      onDropHandler(payload);
    },
  });

  const onDropHandler = ({ ingredient }) => {
    if (!ingredient) {
      return;
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

    dispatch(setRequestOrder(true));
    dispatch(createOrderThunk(orderContent));
    props.onOrderCreateClick();
  };

  const totalPrice = useMemo(() => {
    return selectedItems.reduce(
      (acc, curr) => acc + curr.price,
      bun?.price * 2 || 0
    );
  }, [selectedItems, bun]);

  const selectedIngredients = useMemo(() => {
    return selectedItems.map((item, index) => (
      <BurgerConstructorItem ingredient={item} index={index} key={item.uuid} />
    ));
  }, [selectedItems]);

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
