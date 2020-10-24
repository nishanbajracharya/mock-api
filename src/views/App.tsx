import React, { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

import 'react-toastify/dist/ReactToastify.css';

import Router from './Router';
import { auth } from '../services/firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  toastContainer: {
    padding: 0,
    minHeight: 'auto',
    background: 'transparent',
  },
  toastBody: {
    margin: 0,
  }
}));

function LoadingBox() {
  const classes = useStyles();

  return <div className={classes.paper}>
    <CircularProgress disableShrink />
  </div>
}

function App() {
  const classes = useStyles();

  const [, loading] = useAuthState(auth);

  function handlePromiseRejection(event: PromiseRejectionEvent) {
    if (event.reason.name === 'FirebaseError') {
      toast(<Alert variant="filled" severity="error">{event.reason.message}</Alert>, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  useEffect(() => {
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    }
  }, []);

  if (loading) {
    return <LoadingBox />;
  }

  return (
    <React.Fragment>
      <Router />
      <ToastContainer closeButton={false} toastClassName={classes.toastContainer} bodyClassName={classes.toastBody} />
    </React.Fragment>
  );
}

export default App;
