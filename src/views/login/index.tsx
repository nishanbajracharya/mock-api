import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import userService from '../../services/user';
import { loginSchema } from '../../schema/login';
import { getErrorMessage, ErrorProp } from '../../utils/errorHandler';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';

const useStyles = makeStyles((theme) => ({
  base: {
    height: '100vh',
    boxSizing: 'border-box',
    paddingTop: theme.spacing(16),
    background: theme.palette.background.paper,
  },
  box: {
    borderRadius: 4,
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    margin: theme.spacing(2),
    fill: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  headerText: {
    color: theme.palette.text.primary,
  },
  progress: {
    marginLeft: theme.spacing(1),
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    background: theme.palette.common.white,
  },
  googleLogo: {
    marginRight: theme.spacing(1),
  },
}));

function Login() {
  const [error, setError] = useState<ErrorProp>({});
  const [visibility, setVisibility] = useState(false);

  const handleClickShowPassword = () => {
    setVisibility(!visibility);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const classes = useStyles();

  function login(email: string, password: string) {
    return userService.login(email, password)
      .catch(error => {
        setError(error);
      });
  }

  function clearError() {
    if (error.code) setError({});
  }

  return (
    <div className={classes.base}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Logo width={48} className={classes.logo} />
          <Typography component="h1" variant="h5" className={classes.headerText}>
            Mock API Admin
            </Typography>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              setError({});
              login(values.email, values.password)
                .finally(() => setSubmitting(false));
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Typography variant="body1" color="textSecondary" align="center">Sign in with email</Typography>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  type={visibility ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {visibility ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                  }}

                />
                <Button
                  fullWidth
                  className={classes.submit}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Sign In {isSubmitting && <CircularProgress size={20} className={classes.progress} />}
                </Button>
                {error.code && <Alert severity="error" className={classes.alert} onClose={clearError}>{getErrorMessage(error)}</Alert>}
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
}

export default Login;
