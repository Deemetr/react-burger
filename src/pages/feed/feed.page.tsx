import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";
import { Order } from "../../models/order";
import {
  WS_CONNECTION_START,
  WS_DISCONNECT
} from "../../services/actions/wsActionTypes";
import { useAppDispatch } from "../../services/reducers";
import { getClassName } from "../../utils";
import styles from "./feed.page.module.css";

export default function Feed() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      url: "wss://norma.nomoreparties.space/orders/all",
    });
    return () => {
      dispatch({ type: WS_DISCONNECT });
    };
  }, []);

  let location = useLocation();

  const {
    orders,
    total,
    totalToday,
  }: { orders: Order[]; total: number; totalToday: number } = useSelector(
    (state: any) => state.feed
  );

  return (
    <div className="feed-wrapper">
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles["feed__content"]}>
        <div className={styles["feed__list"]}>
          {orders.map((order) => (
            <Link
              key={order._id}
              to={{
                pathname: `/feed/${order._id}`,
                state: { background: location },
              }}
            >
              <OrderCard order={order} />
            </Link>
          ))}
        </div>
        <div className={styles["stats"]}>
          <div className={getClassName(styles["orders"], "stats__item ")}>
            <div className={styles["orders-done"]}>
              <span className="text text_type_main-medium mb-6">Готовы:</span>
              <ul className={getClassName(styles["done-orders"], styles.list)}>
                {orders
                  .filter((order) => order.status === "done")
                  .map((item) => (
                    <li className="text text_type_digits-default">
                      {item.number}
                    </li>
                  ))}
              </ul>
            </div>

            <div className={styles["orders-in-work"]}>
              <span className="text text_type_main-medium mb-6">В работе:</span>
              <ul
                className={getClassName(styles["pending-orders"], styles.list)}
              >
                {orders
                  .filter((order) => order.status === "pending")
                  .map((item) => (
                    <li className="text text_type_digits-default">
                      {item.number}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={getClassName(styles["orders-total"], "stats__item ")}>
            <span className="text text_type_main-medium">
              Выполнено за все время:
            </span>
            <span className="text text_type_digits-large">{total}</span>
          </div>
          <div className={getClassName(styles["order-today"], "stats__item ")}>
            <span className="text text_type_main-medium">
              Выполнено за сегодня:
            </span>
            <span className="text text_type_digits-large">{totalToday}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
