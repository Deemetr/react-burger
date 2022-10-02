import { useDispatch, useSelector } from "react-redux";

import style from "./ingredient-details.module.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getClassName } from "../../utils";

import { Ingredient, LocationState } from "../../models";
import { fetchIngredients } from "../../services/reducers/ingredients-reducer";

function IngredientDetails() {
  const { items }: { items: { items: Ingredient[] }[] } = useSelector(
    (store: any) => store.ingredients
  );
  let [ingredient, setIngredient] = useState<Ingredient>();

  const location = useLocation<LocationState>();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const id = location.pathname.split("/").pop();

    if (!items) {
      return;
    }

    const ingredient = items
      .reduce(
        (state: Ingredient[], current: { items: Ingredient[] }) => [
          ...state,
          ...current.items,
        ],
        []
      )
      .find((item: Ingredient) => item._id === id);

    if (ingredient) {
      setIngredient(ingredient);
    }
  }, [location, items]);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={style.details}>
      <picture className={style.picture}>
        <source media="(max-width: 480px)" srcSet={ingredient.image_mobile} />
        <source media="(max-width: 1024px)" srcSet={ingredient.image_large} />
        <img src={ingredient.image} alt={`${ingredient.name}.`}></img>
      </picture>
      <p className="text text_type_main-medium mt-4  mb-8">{ingredient.name}</p>
      <div className={getClassName(style.stats, "mb-15")}>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Белки, г
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Жиры, г
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
