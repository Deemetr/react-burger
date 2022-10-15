import { useMemo } from "react";
import { useDrop } from "react-dnd";

import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Ingredient } from "../../models";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import { addIngredient } from "../../services/reducers/ingredients-reducer";
import {
  createOrderThunk,
  setRequestOrder
} from "../../services/reducers/orders-reducer";
import { getClassName } from "../../utils";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import style from "./burger-constructor.module.css";

function BurgerConstructor({
  onOrderCreateClick,
}: {
  onOrderCreateClick: () => void;
}) {
  const { selectedItems, selectedBun: bun } = useAppSelector(
    (store) => store.ingredients
  );
  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(payload: { ingredient: Ingredient }) {
      onDropHandler(payload);
    },
  });

  const onDropHandler = ({ ingredient }: { ingredient: Ingredient }) => {
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
    onOrderCreateClick();
  };

  const totalPrice = useMemo(() => {
    const initialValue = bun ? bun.price * 2 : 0;

    return selectedItems.reduce((acc, curr) => acc + curr.price, initialValue);
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
            isLocked={true}
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
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
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

export default BurgerConstructor;
