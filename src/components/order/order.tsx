import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientType } from "../../enums";
import { Ingredient, IngredientGroup } from "../../models";
import { Order as OrderType } from "../../models/order";
import { getClassName } from "../../utils";
import IngredientPreview from "../ingredient-preview/ingredient-preview";
import styles from "./order.module.css";

interface OrderRouteParams {
  id: string;
}

type Countable = Ingredient & { count: number };

export default function Order() {
  const { id } = useParams<OrderRouteParams>();
  const { orders }: { orders: OrderType[] } = useSelector(
    (state: any) => state.feed
  );

  const order = useMemo(
    () => orders.find((item) => item._id === id),
    [orders, id]
  );

  const ingredientsGroups: IngredientGroup[] = useSelector(
    (state: any) => state.ingredients.items
  );

  const _ingredients: Countable[] = useMemo(() => {
    const _flatIngredients = ingredientsGroups.reduce(
      (state: Ingredient[], group: IngredientGroup) => [
        ...state,
        ...group.items,
      ],
      []
    );

    const orderIngredients = order
      ? _flatIngredients.filter((item) => order.ingredients.includes(item._id))
      : [];

    return orderIngredients.reduce((state: Countable[], item: Ingredient) => {
      const count =
        item.type === IngredientType.BUN
          ? 2
          : order
          ? order.ingredients.filter((id) => id === item._id).length
          : 0;

      return state.some((countable) => countable._id === item._id)
        ? state
        : [...state, { ...item, count }];
    }, []);
  }, [order, ingredientsGroups]);

  const totalPrice = useMemo(
    () =>
      _ingredients.reduce(
        (total, ingredient) => total + ingredient.count * ingredient.price,
        0
      ),
    [_ingredients]
  );

  if (!order) {
    return null;
  }

  return (
    <div className={styles.order}>
      <span
        className={getClassName(
          styles["order__number"],
          "text text_type_digits-default mb-10"
        )}
      >
        {`#${order.number}`}
      </span>

      <div className={getClassName(styles["order__title"], "mb-15")}>
        <span className="text text_type_main-medium mb-3">{order.name}</span>
        <span
          className={getClassName(
            styles["order__status"],
            "text text_type_main-default"
          )}
        >
          {order.status === "done" ? "Выполнен" : "В работе"}
        </span>
      </div>

      <div className="order__content mb-10">
        <span className="text text_type_main-medium mb-6">Состав:</span>
        <div className={styles["order__ingredients"]}>
          {_ingredients.map((item) => (
            <div
              className={getClassName(styles.ingredient, "mb-4")}
              key={item._id}
            >
              <IngredientPreview imgSrc={item.image} />
              <span className="text text_type_main-default ml-4">
                {item.name}
              </span>
              <div className={styles.price}>
                <span className="text text_type_digits-default mr-1">{`${item.count} x ${item.price}`}</span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={getClassName(styles["order__footer"], "mb-10")}>
        <span className="text text_type_main-default text_color_inactive">
          {order.createdAt}
        </span>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-1 ">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
