import Case from 'case';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createCollectionSchema } from '../../../schema/collection';
import { getErrorMessage, ErrorProp } from '../../../utils/errorHandler';


const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
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
  },
}));

function CollectionForm(props: CollectionFormProps) {
  const classes = useStyles();

  const [error, setError] = useState<ErrorProp>({});

  function clearError() {
    setError({});
  }

  return <div>
    <Formik
      initialValues={{
        title: '',
        route: '',
      }}
      validationSchema={createCollectionSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.create({
          title: values.title,
          route: values.route,
        })?.then(() => {
          props.handleClose();
        }).catch(error => {
          setError(error);
        }).finally(() => {
          setSubmitting(false);
        })
      }}
    >
      {
        ({ submitForm, setFieldValue, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="title"
              type="title"
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('title', event.target.value);

                setFieldValue('route', '/' + Case.kebab(event.target.value));
              }}
            />
            <Field
              component={TextField}
              name="route"
              type="route"
              label="Route"
              variant="outlined"
              placeholder="/route"
              fullWidth
              margin="normal"
            />
            <Button
              fullWidth
              className={classes.submit}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Create Collection {isSubmitting && <CircularProgress size={20} className={classes.progress} />}
            </Button>
            {error.code && <Alert severity="error" className={classes.alert} onClose={clearError}>{getErrorMessage(error)}</Alert>}
          </Form>
        )
      }
    </Formik>
  </div>;
}

export default CollectionForm;