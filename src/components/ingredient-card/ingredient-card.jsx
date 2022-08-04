import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "./ingredient-card.css";
import { render } from "@testing-library/react";

class IngredientCard extends React.Component {
  render() {
    const { ingredient } = this.props;

    if (!ingredient) {
      return;
    }

    return (
      <div className="ingredient" onClick={() => this.handleClick(ingredient)}>
        <div className="ingredient__counter">
          <Counter count={1} size="default" />
        </div>
        <img
          className="ingredient__image"
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className="ingredient__price price mt-1 mb-1">
          <span className="price__value text text_type_digits-default">
            {ingredient.price}
          </span>
          &nbsp;
          <CurrencyIcon type="primary" />
        </div>
        <span className="ingredient__name text text_type_main-default">
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

export default IngredientCard;
