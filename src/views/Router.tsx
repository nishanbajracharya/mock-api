import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Redirect, Switch, RouteProps } from 'react-router-dom';

import Home from './home';
import Login from './login';
import { auth } from '../services/firebase';
import { ROUTES } from '../constants/routes';

function AuthRoute({ children, ...rest }: RouteProps) {
  const [user] = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: ROUTES.HOME,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function PrivateRoute({ children, ...rest }: RouteProps) {
  const [user] = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function Router() {

  return <BrowserRouter>
    <Switch>
      <AuthRoute path={ROUTES.LOGIN}><Login /></AuthRoute>
      <PrivateRoute path={[ROUTES.COLLECTION, ROUTES.HOME]}>
        <Home />
      </PrivateRoute>
    </Switch>
  </BrowserRouter>
}

export default Router;