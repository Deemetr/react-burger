import React from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";
import { getIngredients } from "../../services";

import style from "./app.module.css";

function App() {
  const [selected, setSelected] = React.useState([]);
  const [topBun, setTopBun] = React.useState(null);
  const [bottomBun, setBottomBun] = React.useState(null);
  const [counters, setCounters] = React.useState(new Map());
  const [ingredientGroups, setIngredientGroups] = React.useState([]);

  const onIngredientClick = (ingredient) => {
    if (hasBothBun() && ingredient.type === INGREDIENT_TYPES.BUN) {
      return;
    }

    increaseCounter(ingredient);

    if (ingredient.type === INGREDIENT_TYPES.BUN) {
      setBuns(ingredient);
      return;
    }

    setSelected([...selected, ingredient]);
  };

  const onIngredientDelete = (position) => {
    const newSelected = [...selected];

    const [deletedIngredient] = newSelected.splice(position, 1);
    decreaseCounters(deletedIngredient);

    setSelected(newSelected);
  };

  const decreaseCounters = (deletedIngredient) => {
    const newCounters = new Map(counters);

    if (newCounters.has(deletedIngredient._id)) {
      const decreasedValue = newCounters.get(deletedIngredient._id) - 1;
      newCounters.set(deletedIngredient._id, decreasedValue);
    }

    setCounters(newCounters);
  };

  const increaseCounter = (ingredient) => {
    const newCounters = new Map(counters);

    if (!newCounters.has(ingredient._id)) {
      newCounters.set(ingredient._id, 0);
    }
    const newValue = newCounters.get(ingredient._id) + 1;
    newCounters.set(ingredient._id, newValue);

    setCounters(newCounters);
  };

  const setBuns = (ingredient) => {
    if (!bottomBun) {
      setBottomBun({ ...ingredient, name: `${ingredient.name} (низ)` });
      return;
    }

    if (!topBun) {
      setTopBun({ ...ingredient, name: `${ingredient.name} (верх)` });
      return;
    }
  };

  const hasBothBun = () => {
    return topBun && bottomBun;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const ingredientGroups = await getIngredients();
      setIngredientGroups(ingredientGroups);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      <main className={getClassName(style.content, style.main)}>
        <BurgerIngredients
          onIngredientClick={onIngredientClick}
          counters={counters}
          ingredientGroups={ingredientGroups}
        />
        <BurgerConstructor
          selectedIngredients={selected}
          onIngredientDelete={onIngredientDelete}
          top={topBun}
          bottom={bottomBun}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
