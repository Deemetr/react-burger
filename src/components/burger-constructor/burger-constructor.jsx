import PropTypes from 'prop-types';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";

import style from "./burger-constructor.module.css";

function BurgerConstructor(props) {
  return (
    <div className={getClassName(style["burger-constructor"], "mt-25")}>
      <div className={style.position}>
        {props.top && (
          <ConstructorElement
            type="top"
            isLocked="true"
            text={props.top.name}
            price={props.top.price}
            thumbnail={props.top.image}
          />
        )}
      </div>

      <div className={style.middle}>
        {props.selectedIngredients.map((item, index) => (
          <div className={style.position} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
              isLocked={item.type === INGREDIENT_TYPES.BUN}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => props.onIngredientDelete(index)}
            />
          </div>
        ))}
      </div>

      <div className={style.position}>
        {props.bottom && (
          <ConstructorElement
            type="bottom"
            isLocked="true"
            text={props.bottom.name}
            price={props.bottom.price}
            thumbnail={props.bottom.image}
            className={style.position}
          />
        )}
      </div>

      <div className={getClassName(style.summary, "mt-10")}>
        <p className="mr-10">
          <span className="text text_type_digits-medium">
            {props.selectedIngredients.reduce(
              (acc, curr) => acc + curr.price,
              (props.top?.price || 0) + (props.bottom?.price || 0)
            )}
          </span>
          &nbsp;
          <CurrencyIcon type="primary" />
        </p>

        <Button onClick={props.onOrderCreateClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.array.isRequired,
  onIngredientDelete: PropTypes.func.isRequired,
  top: PropTypes.object,
  bottom: PropTypes.object,
  onOrderCreateClick: PropTypes.func.isRequired
}; 

export default BurgerConstructor;
