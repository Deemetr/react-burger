import { Link, useLocation } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { Order as OrderType } from "../../models/order";
import styles from "./orders.page.module.css";

export default function OrdersPage() {
  const location = useLocation();

  const orders: OrderType[] = [
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
    <div className={styles["orders-page"]}>
      <ProfileNav />
      <div className={styles["orders-list"]}>
        {orders.map((order) => (
          <Link
            key={order._id}
            to={{
              pathname: `/profile/orders/${order._id}`,
              state: { background: location },
            }}
          >
            <OrderCard order={order} />
          </Link>
        ))}
      </div>
    </div>
  );
}
