import React from "react";
import PropTypes from "prop-types";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getClassName } from "../../utils";

import style from "./ingredient-card.module.css";

class IngredientCard extends React.Component {
  render() {
    const { ingredient } = this.props;

    if (!ingredient) {
      return;
    }

    return (
      <div
        className={style.ingredient}
        onClick={() => this.handleClick(ingredient)}
      >
        <div className={style.counter}>
          <Counter count={this.props.count} size="default" />
        </div>
        <img
          className={style.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={getClassName(style.price, "mt-1 mb-1")}>
          <span
            className={getClassName(
              style["price-value"],
              "text text_type_digits-default"
            )}
          >
            {ingredient.price}
          </span>
          &nbsp;
          <CurrencyIcon type="primary" />
        </div>
        <span
          className={getClassName(style.name, "text text_type_main-default")}
        >
          {ingredient.name}
        </span>
      </div>
    );
  }

  handleClick = (ingredient) => {
    if (!this.props.onClick) {
      return;
    }

    this.props.onClick(ingredient);
  };
}

IngredientCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  count: PropTypes.number.isRequired,
};

export default IngredientCard;
