import { Route, Redirect } from "react-router-dom";
import { ReactNode } from "react";
import { useUser } from "../store/userStore";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import "./styles/routes.css";

export function PrivateRoute({
  children,
  ...rest
}: {
  children: ReactNode;
  path: string;
}) {
  let auth = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const LoggedInRoute = ({
  children,
  ...rest
}: {
  children: ReactNode;
  path: string;
}) => {
  const { user, loading } = useUser();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loading ? (
          <div className="routes__loader">
            <Loader
              type="TailSpin"
              color="#6396ab"
              height={80}
              width={80}
              timeout={3000}
            />
          </div>
        ) : user ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};
