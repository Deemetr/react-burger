import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { Order as OrderType } from "../../models/order";
import {
  WS_CONNECTION_START,
  WS_DISCONNECT
} from "../../services/actions/wsActionTypes";
import { useAppDispatch, useAppSelector } from "../../services/reducers";
import { getCookie } from "../../utils";
import styles from "./orders.page.module.css";

export default function OrdersPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie("token")?.replace("Bearer ", "");

    dispatch({
      type: WS_CONNECTION_START,
      url: `wss://norma.nomoreparties.space/orders?token=${token}`,
    });
    return () => {
      dispatch({ type: WS_DISCONNECT });
    };
  }, []);

  const { orders }: { orders: OrderType[] } = useAppSelector(
    (state) => state.feed
  );

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
