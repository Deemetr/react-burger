import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { fetchIngredients } from "../../services/reducers/ingredients-reducer";

import styles from "./home.page.module.css";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

  const handleOrderCloseModal = () => {
    setOrderDetailsVisible(false);
  };
  const handleOrderOpenModal = () => {
    setOrderDetailsVisible(true);
  };

  const orderDetailModal = (
    <Modal onClose={handleOrderCloseModal} isOpen={orderDetailsVisible}>
      <OrderDetails />
    </Modal>
  );

  return (
    <div className={styles["home-page"]}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor onOrderCreateClick={handleOrderOpenModal} />
      </DndProvider>

      {orderDetailsVisible && orderDetailModal}
    </div>
  );
}
