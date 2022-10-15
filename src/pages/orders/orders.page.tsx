import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { Order as OrderType } from "../../models/order";
import {
  WS_CONNECTION_START,
  WS_DISCONNECT
} from "../../services/actions/wsActionTypes";
import { useAppDispatch } from "../../services/reducers";
import styles from "./orders.page.module.css";

export default function OrdersPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      secure: true,
    });
    return () => {
      dispatch({ type: WS_DISCONNECT });
    };
  }, []);

  const { orders }: { orders: OrderType[] } = useSelector(
    (state: any) => state.feed
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
