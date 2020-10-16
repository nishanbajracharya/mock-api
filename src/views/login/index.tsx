import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';

import { auth } from '../../services/firebase';
import { loginSchema } from '../../schema/login';

function Login() {
  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        login(values.email, values.password)
          .finally(() => setSubmitting(false));
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
            variant="filled"
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
            variant="filled"
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
