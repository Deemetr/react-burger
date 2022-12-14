import { ReactNode } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { LocationState } from "../../models";
import { useAppSelector } from "../../services/reducers";

export function ProtectedRoute({
  children,
  onlyAnonimous = false,
  path,
  exact,
  ...rest
}: {
  children: ReactNode;
  onlyAnonimous?: boolean;
  path: string;
  exact: boolean;
}) {
  const { loggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation<LocationState>();

  if (onlyAnonimous && loggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };

    return (
      <Route {...rest} path={path} exact={exact}>
        <Redirect to={from} />
      </Route>
    );
  }

  const render = ({ location }: { location: LocationState }): ReactNode => {
    if (onlyAnonimous && !loggedIn) {
      return children;
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

  return <Route {...rest} render={render as any} />;
}
