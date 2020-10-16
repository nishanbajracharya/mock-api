import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Redirect, Switch, RouteProps } from 'react-router-dom';

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
  function logout() {
    return auth.signOut();
  }

  return <BrowserRouter>
    <Switch>
      <AuthRoute path={ROUTES.LOGIN}><Login /></AuthRoute>
      <PrivateRoute path={ROUTES.HOME}>
        <Button variant="contained" color="primary" onClick={logout}>Log out</Button>
      </PrivateRoute>
    </Switch>
  </BrowserRouter>
}

export default Router;