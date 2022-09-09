import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getClassName } from "../../utils";

import {
  HomePage,
  NotFoundPage,
  Login,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from "../../pages/index";

import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import { setCurrentIngredient } from "../../services/reducers/ingredients-reducer";

import style from "./app.module.css";

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  let background = location.state && location.state.background;

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
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <Route path="/ingredients/:id">
            <IngredientDetails />
          </Route>
          <ProtectedRoute path="/profile">
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
