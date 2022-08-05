import React, { useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import { INGREDIENT_TYPES } from "../../constants";
import { getClassName } from "../../utils";

import style from "./app.module.css";

class App extends React.Component {
  state = {
    selected: [],
    top: null,
    bottom: null,
    counters: new Map(),
  };

  render() {
    return (
      <React.Fragment>
        <AppHeader />
        <main className={getClassName(style.content, style.main)}>
          <BurgerIngredients
            onIngredientClick={this.onIngredientClick}
            counters={this.state.counters}
          />
          <BurgerConstructor
            selectedIngredients={this.state.selected}
            onIngredientDelete={this.onIngredientDelete}
            top={this.state.top}
            bottom={this.state.bottom}
          />
        </main>
      </React.Fragment>
    );
  }

  onIngredientClick = (ingredient) => {
    if (
      this.state.top &&
      this.state.bottom &&
      ingredient.type === INGREDIENT_TYPES.BUN
    ) {
      return;
    }

    const newCounters = this.increaseCounter(ingredient);

    const newState = {
      ...this.state,
      counters: newCounters,
    };

    if (ingredient.type === INGREDIENT_TYPES.BUN) {
      this.setBuns(ingredient, newState);
    } else {
      newState.selected.push(ingredient);
    }

    this.setState(newState);
  };

  onIngredientDelete = (position) => {
    const newState = {
      ...this.state,
      selected: [...this.state.selected],
    };

    const [deletedIngredient] = newState.selected.splice(position, 1);
    newState.counters = this.decreaseCounters(deletedIngredient);

    this.setState(newState);
  };

  decreaseCounters(deletedIngredient) {
    const newCounters = new Map(this.state.counters);

    if (newCounters.has(deletedIngredient._id)) {
      const newValue = newCounters.get(deletedIngredient._id) - 1;
      newCounters.set(deletedIngredient._id, newValue);
    }

    return newCounters;
  }

  increaseCounter(ingredient) {
    const newCounters = new Map(this.state.counters);

    if (!newCounters.has(ingredient._id)) {
      newCounters.set(ingredient._id, 0);
    }
    const newValue = newCounters.get(ingredient._id) + 1;
    newCounters.set(ingredient._id, newValue);
    return newCounters;
  }

  setBuns(ingredient, newState) {
    if (!this.state.bottom) {
      newState.bottom = { ...ingredient, name: `${ingredient.name} (низ)` };
    } else if (!this.state.top) {
      newState.top = { ...ingredient, name: `${ingredient.name} (верх)` };
    }
  }
}

export default App;
