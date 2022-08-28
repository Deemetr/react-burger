import { useSelector } from "react-redux";

import style from "./order-details.module.css";
import { getClassName } from "../../utils/";

import acepted1x from "../../images/acepted.png";
import acepted2x from "../../images/acepted@2x.png";
import acepted3x from "../../images/acepted@3x.png";

import Loader from "../loader/loader";

function OrderDetails() {
  const { currentOrder, requestOrder } = useSelector((store) => store.orders);

  const content = requestOrder ? (
    <Loader />
  ) : (
    <div className={style["order-details"]}>
      <p
        className={getClassName(
          style["order-id"],
          "text text_type_digits-large"
        )}
      >
        {currentOrder.number}
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img
        className={getClassName(style.image, "mb-15")}
        src={acepted1x}
        srcSet={`${acepted2x} 2x, ${acepted3x} 3x`}
        alt="Принято."
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );

  return <div className={style.wrapper}>{content}</div>;
}

export default OrderDetails;
