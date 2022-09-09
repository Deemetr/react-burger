import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import IngredientCard from "../ingredient-card/ingredient-card";

import style from "./ingredients-group.module.css";

function IngredientsGroup(props) {
  const counters = useSelector((store) => store.ingredients.counters);
  const location = useLocation();

  return (
    <div className="mb-10 mt-10" ref={props.groupRef}>
      <h3 className="text text_type_main-medium mb-6">{props.title}</h3>
      <div className={style.ingredients}>
        {props.ingredients.map((item) => (
          <Link
            key={item._id}
            to={{
              pathname: `/ingredients/${item._id}`,
              state: { background: location },
            }}
          >
            <IngredientCard ingredient={item} count={counters[item._id] || 0} />
          </Link>
        ))}
      </div>
    </div>
  );
}

IngredientsGroup.propTypes = {
  ingredients: PropTypes.array.isRequired,
  groupRef: PropTypes.object,
};

export default IngredientsGroup;
