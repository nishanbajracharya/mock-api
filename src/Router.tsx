import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Redirect, Switch, RouteProps } from 'react-router-dom';

import Login from './views/login';
import { auth } from './services/firebase';

function LoginRoute({ children, ...rest }: RouteProps) {
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
                pathname: '/',
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
                pathname: '/login',
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
      <LoginRoute path="/login"><Login /></LoginRoute>
      <PrivateRoute path="/">
        <Button variant="contained" color="primary" onClick={logout}>Log out</Button>
      </PrivateRoute>
    </Switch>
  </BrowserRouter>
}

export default Router;