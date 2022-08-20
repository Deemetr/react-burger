import React, { useEffect, useRef } from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";
import { getIngredients } from "../../services";

import { BurgerConstructorContext } from "../../contexts/burger-constructor.context";
import { IngredientsContext } from "../../contexts/ingredients.context";

import style from "./app.module.css";

function App() {
  const [constructorState, setConstructorState] = React.useState({
    selected: [],
    orderId: null,
  });
  const [ingredients, setIngredients] = React.useState([]);
  const [counters, setCounters] = React.useState(new Map());

  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);

  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const [currentTab, setCurrentTab] = React.useState("bread");

  const refs = {
    [INGREDIENT_TYPES.BUN]: useRef(null),
    [INGREDIENT_TYPES.MAIN]: useRef(null),
    [INGREDIENT_TYPES.SAUCE]: useRef(null),
  };

  const onIngredientClick = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIngredientVisible(true);
  };

  const handleOrderCloseModal = () => {
    setOrderDetailsVisible(false);
  };
  const handleOrderOpenModal = () => {
    setOrderDetailsVisible(true);
  };

  const handleIngredientDetailsCloseModal = () => {
    setIngredientVisible(false);
    setCurrentIngredient(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredients = await getIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
        setIngredients([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const _counters = constructorState.selected.reduce((state, current) => {
      if (!state.has(current._id)) {
        state.set(current._id, 0);
      }
      const newValue =
        current.type === INGREDIENT_TYPES.BUN ? 2 : state.get(current._id) + 1;
      state.set(current._id, newValue);
      return state;
    }, new Map());

    setCounters(_counters);
  }, [constructorState.selected]);

  const orderDetailModal = (
    <Modal onClose={handleOrderCloseModal} isOpen={orderDetailsVisible}>
      <OrderDetails />
    </Modal>
  );

  const ingredientDetailsModal = (
    <Modal
      title="Детали ингредиента"
      onClose={handleIngredientDetailsCloseModal}
      isOpen={ingredientVisible}
    >
      {currentIngredient && (
        <IngredientDetails ingredient={currentIngredient} />
      )}
    </Modal>
  );

  const onTabClick = (tabName) => setCurrentTab(tabName);

  useEffect(() => {
    try {
      refs[currentTab]?.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert("Что-то пошло не так...");
    }
  }, [currentTab]);

  return (
    <>
      <AppHeader />
      <main className={getClassName(style.main, "content")}>
        <IngredientsContext.Provider value={ingredients}>
          <BurgerIngredients
            onIngredientClick={onIngredientClick}
            counters={counters}
            onTabClick={onTabClick}
            currentTab={currentTab}
            groupRefs={refs}
          />

          <BurgerConstructorContext.Provider
            value={[constructorState, setConstructorState]}
          >
            <BurgerConstructor onOrderCreateClick={handleOrderOpenModal} />
            {orderDetailsVisible && orderDetailModal}
          </BurgerConstructorContext.Provider>
        </IngredientsContext.Provider>
        {ingredientVisible && ingredientDetailsModal}
      </main>
    </>
  );
}

export default App;
