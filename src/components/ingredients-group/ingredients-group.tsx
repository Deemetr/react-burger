import { RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { Ingredient } from "../../models";
import { useAppSelector } from "../../services/reducers";

import IngredientCard from "../ingredient-card/ingredient-card";

import style from "./ingredients-group.module.css";

function IngredientsGroup({
  ingredients,
  groupRef,
  title,
}: {
  ingredients: Ingredient[];
  groupRef: RefObject<HTMLDivElement>;
  title: string;
}) {
  const counters = useAppSelector((store) => store.ingredients.counters);
  const location = useLocation();

  return (
    <div className="mb-10 mt-10" ref={groupRef}>
      <h3 className="text text_type_main-medium mb-6">{title}</h3>
      <div className={style.ingredients}>
        {ingredients.map((item) => (
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

export default IngredientsGroup;
