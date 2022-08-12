import PropTypes from "prop-types";

import style from "./ingredient-details.module.css";

import { getClassName } from "../../utils";

function IngredientDetails(props) {
  if (!props.ingredient) {
    return;
  }

  return (
    <div className={style.details}>
      <picture className={style.picture}>
        <source
          media="(max-width: 480px)"
          srcSet={props.ingredient.image_mobile}
          alt="ingredient-image"
        />
        <source
          media="(max-width: 1024px)"
          srcSet={props.ingredient.image_large}
          alt="ingredient-image"
        />
        <img src={props.ingredient.image} alt="ingredient-image"></img>
      </picture>
      <p className="text text_type_main-medium mt-4  mb-8">
        {props.ingredient.name}
      </p>
      <div className={getClassName(style.stats, "mb-15")}>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.calories}
          </p>
        </div>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Белки, г
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.proteins}
          </p>
        </div>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Жиры, г
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.fat}
          </p>
        </div>
        <div className={style["stats-item"]}>
          <h5 className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </h5>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.object,
};

export default IngredientDetails;
