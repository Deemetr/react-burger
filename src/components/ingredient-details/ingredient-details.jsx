import { useSelector } from "react-redux";

import style from "./ingredient-details.module.css";

import { getClassName } from "../../utils";

function IngredientDetails(props) {
  const ingredient = useSelector(
    (store) => store.ingredients.currentIngredient
  );

  if (!ingredient) {
    return;
  }

  return (
    <div className={style.details}>
      <picture className={style.picture}>
        <source
          media="(max-width: 480px)"
          srcSet={ingredient.image_mobile}
          alt={`${ingredient.name}.`}
        />
        <source
          media="(max-width: 1024px)"
          srcSet={ingredient.image_large}
          alt={`${ingredient.name}.`}
        />
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
