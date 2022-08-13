import React from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

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
  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);
  const [ingredientDetailsVisible, setIngredientDetailsVisible] =
    React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  // eslint-disable-next-line
  const addIngredient = (ingredient) => {
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

  const onIngredientClick = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIngredientDetailsVisible(true);
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

  const handleOrderCloseModal = () => {
    setOrderDetailsVisible(false);
  };
  const handleOrderOpenModal = () => {
    setOrderDetailsVisible(true);
  };

  const handleIngredientDetailsCloseModal = () => {
    setIngredientDetailsVisible(false);
    setCurrentIngredient(null);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredientGroups = await getIngredients();
        setIngredientGroups(ingredientGroups);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (ingredientGroups.length === 0) {
      return;
    }

    const [buns, sauces, main] = ingredientGroups;

    setTopBun(buns.items[0]);
    setBottomBun(buns.items[0]);
    setSelected([...main.items.slice(0, 2), ...sauces.items.slice(0, 2)]);
  }, [ingredientGroups]);

  const orderDetailModal = (
    <Modal title="" onClose={handleOrderCloseModal} modalRootId="modal-root">
      <OrderDetails orderId="034536" />
    </Modal>
  );

  const ingredientDetailsModal = (
    <Modal
      title="Детали ингредиента"
      onClose={handleIngredientDetailsCloseModal}
      modalRootId="modal-root"
    >
      {currentIngredient && (
        <IngredientDetails ingredient={currentIngredient} />
      )}
    </Modal>
  );

  return (
    <React.Fragment>
      <AppHeader />
      <main className={getClassName(style.main, "content")}>
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
          onOrderCreateClick={handleOrderOpenModal}
        />
        {orderDetailsVisible && orderDetailModal}
        {ingredientDetailsVisible && ingredientDetailsModal}
      </main>
    </React.Fragment>
  );
}

export default App;
