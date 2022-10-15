import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo } from "react";
import { IngredientType } from "../../enums";
import { Ingredient, IngredientGroup } from "../../models";
import { Order } from "../../models/order";
import { useAppSelector } from "../../services/reducers";
import { getClassName } from "../../utils";

import IngredientPreview from "../ingredient-preview/ingredient-preview";

import styles from "./order-card.module.css";

export default function OrderCard({ order }: { order: Order }) {
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const renderDate = () => {
    const today = new Date().toLocaleDateString();
    const orderDate = new Date(order.createdAt);
    const orderLocaleDateString = orderDate.toLocaleDateString();
    const orderLocaleTimeString = orderDate.toLocaleTimeString();

    return (
      <span className="order__time text text_type_main-default text_color_inactive">
        {`${
          today === orderLocaleDateString ? "Сегодня" : orderLocaleDateString
        }, ${orderLocaleTimeString}`}
      </span>
    );
  };

  const _ingredients = useMemo(() => {
    if (!ingredients) {
      return null;
    }

    const flatIngredients: Ingredient[] = ingredients.reduce(
      (state: Ingredient[], current: IngredientGroup) => [
        ...state,
        ...current.items,
      ],
      []
    );

    return flatIngredients
      .map((ingredient) => ({
        id: ingredient._id,
        image: ingredient.image,
        type: ingredient.type,
        price: ingredient.price,
      }))
      .filter((item) => order.ingredients.includes(item.id));
  }, [order]);

  const renderIngredients = useCallback(() => {
    if (!_ingredients) {
      return null;
    }

    const moreThenFive = !_ingredients ? false : _ingredients?.length > 5;
    const firstFive = _ingredients.slice(0, 5);

    return (
      <>
        {firstFive.map((item) => (
          <IngredientPreview key={item.id} imgSrc={item.image} />
        ))}
        {moreThenFive && (
          <span className="ml-1 text text_type_digits-default">{`+${
            _ingredients.length - 5
          }`}</span>
        )}
      </>
    );
  }, [_ingredients]);

  const orderPrice = useMemo(
    () =>
      _ingredients?.reduce((total, ingredient) => {
        return (
          total +
          (ingredient.type === IngredientType.BUN
            ? ingredient.price * 2
            : ingredient.price)
        );
      }, 0),
    [_ingredients]
  );

  return (
    <div className={styles.order}>
      <div className={styles["order__info"]}>
        <span className="order__number text text_type_digits-default">
          {`#${order.number}`}
        </span>
        {renderDate()}
      </div>

      <span className="order__name text text_type_main-medium">
        {order.name}
      </span>

      <div className={styles["order__content"]}>
        <div className={getClassName(styles["order__ingredients"], "mr-6")}>
          {renderIngredients()}
        </div>
        <div className={styles["order__price"]}>
          <span className="text text_type_digits-default mr-1">
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
