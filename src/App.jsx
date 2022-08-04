import React from "react";

import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

import { INGREDIENT_TYPES } from "./constants";

import "./App.css";

class App extends React.Component {
  state = {
    selected: [],
    top: null,
    bottom: null,
  };

  render() {
    return (
      <React.Fragment>
        <AppHeader />
        <main className="content d-flex justify-content-between">
          <BurgerIngredients onIngredientClick={this.onIngredientClick} />
          <BurgerConstructor
            selectedIngredients={this.state.selected}
            onIngredientDelete={this.onIngredientDelete}
          />
        </main>
      </React.Fragment>
    );
  }

  onIngredientClick = (ingredient) => {
    const quantity = this.state.selected.filter(
      (item) => item._id === ingredient._id
    ).length;

    if (quantity === 2 && ingredient.type === INGREDIENT_TYPES.BUN) {
      return;
    }

    const newState = {
      ...this.state,
    };

    if (ingredient.type == INGREDIENT_TYPES.BUN) {
      this.setBuns(ingredient, newState);
    } else {
      newState.selected.push(ingredient);
    }

    newState.selected = this.generateIngredientsList(newState);
    this.setState(newState);
  };

  onIngredientDelete = (position) => {
    const newState = {
      ...this.state,
      selected: [...this.state.selected],
    };

    newState.selected.splice(position, 1);
    newState.selected = this.generateIngredientsList(newState);

    this.setState(newState);
  };

  generateIngredientsList(state) {


    const other = (state.selected || []).filter(
      (item) =>
        item.type === INGREDIENT_TYPES.MAIN ||
        item.type === INGREDIENT_TYPES.SAUCE
    );

    return [state.top, ...other, state.bottom].filter((item) => !!item);
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
