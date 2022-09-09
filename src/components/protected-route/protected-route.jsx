import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, onlyAnonimous = false, ...rest }) {
  const { loggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  if (onlyAnonimous && loggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }



  const render = ({ location }) => {
    if (onlyAnonimous && !loggedIn) {
      return (children);
    }
    
    return loggedIn ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  };

  return <Route {...rest} render={render} />;
}
