import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import {
  ForgotPasswordPage, HomePage, Login, NotFoundPage, ProfilePage, RegisterPage, ResetPasswordPage
} from "../../pages/index";
import { setCurrentIngredient } from "../../services/reducers/ingredients-reducer";
import { getClassName } from "../../utils";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ProtectedRoute } from "../protected-route/protected-route";
import style from "./app.module.css";

function App() {
  const location = useLocation<Location>();
  const history = useHistory();
  const dispatch = useDispatch<any>();
  let background = location.state && (location.state as any).background;

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
    </>
  );
}

export default App;
