import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


export function ProtectedRoute({ children, ...rest }) {

  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
