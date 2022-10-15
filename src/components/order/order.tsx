import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IngredientType } from "../../enums";
import { Ingredient, IngredientGroup } from "../../models";
import { Order as OrderType } from "../../models/order";
import { getClassName } from "../../utils";
import IngredientPreview from "../ingredient-preview/ingredient-preview";
import styles from "./order.module.css";

type Countable = Ingredient & { count: number };

export default function Order() {
  const order: OrderType = {
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733cd",
      "60d3b41abdacab0026a733c9",
    ],
    _id: "",
    status: "done",
    name: "Death Star Starship Main бургер",
    number: 324234324,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  };

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

    const orderIngredients = _flatIngredients.filter((item) =>
      order.ingredients.includes(item._id)
    );

    return orderIngredients.reduce((state: Countable[], item: Ingredient) => {
      const count =
        item.type === IngredientType.BUN
          ? 2
          : order.ingredients.filter((id) => id === item._id).length;

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

      <div className={getClassName(styles["order__footer"], 'mb-10')}>
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
