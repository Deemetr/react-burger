import { Link, useLocation } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";
import { Order } from "../../models/order";
import { getClassName } from "../../utils";
import styles from "./feed.page.module.css";

export default function Feed() {
  let location = useLocation();
  const orders: Order[] = [
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c9",
      ],
      _id: "1",
      status: "done",
      number: 1,
      name: "Death Star Starship Main бургер",
      createdAt: "2021-06-23T20:11:01.403Z",
      updatedAt: "2021-06-23T20:11:01.406Z",
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c9",
      ],
      _id: "2",
      status: "done",
      number: 2,
      name: "Death Star Starship Main бургер",
      createdAt: "2021-06-23T20:13:23.654Z",
      updatedAt: "2021-06-23T20:13:23.657Z",
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c9",
      ],
      _id: "3",
      status: "done",
      number: 3,
      name: "Death Star Starship Main бургер",
      createdAt: "2021-06-23T20:13:23.654Z",
      updatedAt: "2021-06-23T20:13:23.657Z",
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c9",
      ],
      _id: "4",
      status: "done",
      number: 4,
      name: "Death Star Starship Main бургер",
      createdAt: "2021-06-23T20:13:23.654Z",
      updatedAt: "2021-06-23T20:13:23.657Z",
    },
  ];

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
            </div>

            <div className={styles["orders-in-work"]}>
              <span className="text text_type_main-medium mb-6">В работе:</span>
            </div>
          </div>
          <div className={getClassName(styles["orders-total"], "stats__item ")}>
            <span className="text text_type_main-medium">
              Выполнено за все время:
            </span>
            <span className="text text_type_digits-large">28752</span>
          </div>
          <div className={getClassName(styles["order-today"], "stats__item ")}>
            <span className="text text_type_main-medium">
              Выполнено за сегодня:
            </span>
            <span className="text text_type_digits-large">138</span>
          </div>
        </div>
      </div>
    </div>
  );
}
