import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getClassName } from "../../utils";

import { setCurrentIngredient } from "../../services/reducers/ingredients-reducer";

import { useEffect, useState } from "react";
import { Ingredient } from "../../models";
import style from "./ingredient-card.module.css";

function IngredientCard({
  ingredient,
  count,
}: {
  ingredient: Ingredient;
  count: number;
}) {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [ingredientStyle, setIngredientStyle] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const _styles = [style.ingredient];

    if (isDrag) {
      _styles.push(style.dragging);
    }
    setIngredientStyle(_styles);
  }, [isDrag]);

  if (!ingredient) {
    return <></>;
  }

  const handleClick = (ingredient: Ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
  };

  return (
    <div
      className={getClassName(...ingredientStyle)}
      onClick={() => handleClick(ingredient)}
      ref={dragRef}
    >
      <div className={style.counter}>
        <Counter count={count} size="default" />
      </div>
      <img
        className={style.image}
        src={ingredient.image}
        alt={`${ingredient.name}.`}
      />
      <div className={getClassName(style.price, "mt-1 mb-1")}>
        <span
          className={getClassName(
            style["price-value"],
            "text text_type_digits-default"
          )}
        >
          {ingredient.price}
        </span>
        &nbsp;
        <CurrencyIcon type="primary" />
      </div>
      <span className={getClassName(style.name, "text text_type_main-default")}>
        {ingredient.name}
      </span>
    </div>
  );
}

export default IngredientCard;
