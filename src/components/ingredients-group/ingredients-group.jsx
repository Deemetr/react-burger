import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import IngredientCard from "../ingredient-card/ingredient-card";

import style from "./ingredients-group.module.css";



function IngredientsGroup(props) {
  const counters = useSelector((store) => store.ingredients.counters);

  return (
    <div className="mb-10 mt-10" ref={props.groupRef}>
      <h3 className="text text_type_main-medium mb-6">{props.title}</h3>
      <div className={style.ingredients}>
        {props.ingredients.map((item) => (
          <IngredientCard
            key={item._id}
            ingredient={item}
            onClick={props.onIngredientClick}
            count={counters[item._id] || 0}
          />
        ))}
      </div>
    </div>
  );
}

IngredientsGroup.propTypes = {
  onIngredientClick: PropTypes.func.isRequired,
  ingredients: PropTypes.array.isRequired,
  groupRef: PropTypes.object,
};

export default IngredientsGroup;
