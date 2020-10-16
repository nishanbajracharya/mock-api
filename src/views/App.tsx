import React from 'react';
import { makeStyles } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

import Router from './Router';
import { auth } from '../services/firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function LoadingBox() {
  const classes = useStyles();

  return <div className={classes.paper}>
    <CircularProgress disableShrink />
  </div>
}

function App() {
  const [, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingBox />;
  }

  return (
    <Router />
  );
}

export default App;
