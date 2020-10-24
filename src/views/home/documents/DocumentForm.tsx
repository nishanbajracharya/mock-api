import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { Select } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Formik, Form, Field, FieldArray } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createDocumentSchema } from '../../../schema/document';
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

function DocumentField(props: DocumentFieldComponentProps) {
  return <div>
    {
      props.values.fields && props.values.fields.map((field: DocumentFieldProp, index: number) => {
        return <div key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                name={`fields.${index}.label`}
                type="text"
                label="Label"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                name={`fields.${index}.displayLabel`}
                type="text"
                label="DisplayLabel"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Field
                component={Select}
                name={`fields.${index}.type`}
                type="text"
                label="Type"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
              </Field>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                name={`fields.${index}.value`}
                type={field.type}
                label="Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton onClick={() => props.arrayHelpers.remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      })
    }
    <Button
      fullWidth
      variant="contained"
      onClick={() => props.arrayHelpers.push({ type: 'string', label: '', value: '', displayLabel: '' })}
    >
      Add New Field
    </Button>
  </div>
}

function DocumentForm(props: DocumentFormProps) {
  const classes = useStyles();

  const [error, setError] = useState<ErrorProp>({});

  function clearError() {
    setError({});
  }

  return <div>
    <Formik
      initialValues={props.initialValues || {
        fields: [],
        displayLabel: '',
      }}
      validationSchema={createDocumentSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.submit({
          fields: values.fields,
          displayLabel: values.displayLabel,
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
        ({ values, submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="displayLabel"
              type="text"
              label="Display Label"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <FieldArray
              name="fields"
              render={arrayHelpers => <DocumentField arrayHelpers={arrayHelpers} values={values} />}
            />
            <Button
              fullWidth
              className={classes.submit}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              {props.initialValues ? 'Update' : 'Create'} Document {isSubmitting && <CircularProgress size={20} className={classes.progress} />}
            </Button>
            {error.code && <Alert severity="error" className={classes.alert} onClose={clearError}>{getErrorMessage(error)}</Alert>}
          </Form>
        )
      }
    </Formik>
  </div>;
}

export default DocumentForm;