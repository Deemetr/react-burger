import React, { useEffect, useRef } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";

import style from "./app.module.css";

import {
  fetchIngredients,
  setCurrentIngredient,
} from "../../services/reducers/ingredients-reducer";

function App() {
  const dispatch = useDispatch();

  const [counters, setCounters] = React.useState(new Map());

  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);

  const [currentTab, setCurrentTab] = React.useState("bread");

  const [draggedElements, setDraggedElements] = React.useState([]);

  const refs = {
    [INGREDIENT_TYPES.BUN]: useRef(null),
    [INGREDIENT_TYPES.MAIN]: useRef(null),
    [INGREDIENT_TYPES.SAUCE]: useRef(null),
  };

  const onIngredientClick = () => {
    debugger;
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
    dispatch(setCurrentIngredient(null));
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

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
      <IngredientDetails />
    </Modal>
  );

  const onTabClick = (tabName) => setCurrentTab(tabName);

  useEffect(() => {
    try {
      refs[currentTab]?.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert("Что-то пошло не так...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const dragHandle = (id) => {};

  return (
    <>
      <AppHeader />
      <main className={getClassName(style.main, "content")}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            onIngredientClick={onIngredientClick}
            onTabClick={onTabClick}
            currentTab={currentTab}
            groupRefs={refs}
          />

          <BurgerConstructor onOrderCreateClick={handleOrderOpenModal} />
        </DndProvider>

        {orderDetailsVisible && orderDetailModal}
        {ingredientVisible && ingredientDetailsModal}
      </main>
    </>
  );
}

export default App;
