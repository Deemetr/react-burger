import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import { wsConnect, wsDisconnect } from "../../services/reducers/feed-reducer";
import { getCookie } from "../../utils";
import styles from "./orders.page.module.css";

export default function OrdersPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie("token")?.replace("Bearer ", "");

    dispatch(
      wsConnect(`wss://norma.nomoreparties.space/orders?token=${token}`)
    );
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  const { orders } = useAppSelector((state) => state.feed);

  const _orders = useMemo(() => {
    return [...orders].reverse();
  }, [orders]);

  return (
    <div className={styles["orders-page"]}>
      <ProfileNav />
      <div className={styles["orders-list"]}>
        {_orders.map((order) => (
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
