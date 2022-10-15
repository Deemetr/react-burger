import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Ingredient, IngredientGroup } from "../../models";
import { Order } from "../../models/order";
import { getClassName } from "../../utils";

import IngredientPreview from "../ingredient-preview/ingredient-preview";

import styles from "./order-card.module.css";

export default function OrderCard({ order }: { order: Order }) {
  const ingredients = useSelector((state: any) => state.ingredients.items);

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

  const renderIngredients = useCallback(() => {
    if (!ingredients) {
      return null;
    }

    debugger;

    const flatIngredients: Ingredient[] = ingredients.reduce(
      (state: Ingredient[], current: IngredientGroup) => [
        ...state,
        ...current.items,
      ],
      []
    );

    const _ingredients = flatIngredients
      .map((ingredient) => ({
        id: ingredient._id,
        image: ingredient.image,
      }))
      .filter((item) => order.ingredients.includes(item.id));

    return _ingredients.map((item) => (
      <IngredientPreview imgSrc={item.image} />
    ));
  }, [ingredients, order]);

  return (
    <div className={styles.order}>
      <div className={styles["order__info"]}>
        <span className="order__number text text_type_digits-default">
          {`#${order.number}`}
        </span>
        {renderDate()}
      </div>

      <span className="order__name text text_type_main-default">
        Death Star Starship Main бургер
      </span>

      <div className={styles["order__content"]}>
        <div className={getClassName(styles["order__ingredients"], "mr-6")}>
          {renderIngredients()}
        </div>
        <div className={styles["order__price"]}>
          <span className="text text_type_digits-default mr-1">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
