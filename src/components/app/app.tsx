import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import {
  Feed,
  ForgotPasswordPage,
  HomePage,
  Login,
  NotFoundPage,
  OrderPage,
  OrdersPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from "../../pages/index";
import {
  fetchIngredients,
  setCurrentIngredient
} from "../../services/reducers/ingredients-reducer";
import { getClassName } from "../../utils";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Order from "../order/order";
import { ProtectedRoute } from "../protected-route/protected-route";
import style from "./app.module.css";

function App() {
  const location = useLocation<Location>();
  const history = useHistory();
  const dispatch = useDispatch<any>();
  let background = location.state && (location.state as any).background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const handleIngredientDetailsCloseModal = () => {
    dispatch(setCurrentIngredient(null));
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <main className={getClassName(style.main, "content")}>
        <Switch location={background || location}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/ingredients/:id">
            <IngredientDetails />
          </Route>

          <ProtectedRoute path="/login" exact onlyAnonimous={true}>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute path="/register" exact onlyAnonimous={true}>
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute path="/forgot-password" exact onlyAnonimous={true}>
            <ForgotPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute path="/reset-password" exact onlyAnonimous={true}>
            <ResetPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" exact>
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/feed/:id" exact>
            <OrderPage />
          </Route>
          <ProtectedRoute path="/profile/orders/:id" exact>
            <OrderPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact>
            <OrdersPage />
          </ProtectedRoute>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>

      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal
              title="Детали ингредиента"
              onClose={handleIngredientDetailsCloseModal}
              isOpen={true}
            >
              <IngredientDetails />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path="/feed/:id"
          children={
            <Modal onClose={handleIngredientDetailsCloseModal} isOpen={true}>
              <Order />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path="/profile/orders/:id"
          children={
            <Modal onClose={handleIngredientDetailsCloseModal} isOpen={true}>
              <Order />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
