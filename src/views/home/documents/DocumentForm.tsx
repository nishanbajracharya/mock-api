import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { Select } from 'formik-material-ui';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import { DatePicker } from 'formik-material-ui-pickers';
import { Formik, Form, Field, FieldArray } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createDocumentSchema } from '../../../schema/document';
import { getErrorMessage, ErrorProp } from '../../../utils/errorHandler';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    minWidth: theme.breakpoints.width('sm'),
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
  fieldArrayList: {
    marginBottom: theme.spacing(2),
  },
  fieldArrayContainer: {
    marginTop: theme.spacing(1),
  },
  addIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

type FieldValueProps = {
  index: number;
  type: string | undefined;
};

function FieldValue(props: FieldValueProps) {
  if (props.type === 'boolean') {
    return <FormControl fullWidth>
      <InputLabel htmlFor={`field-value-${props.index}`} variant="outlined">Value</InputLabel>
      <Field
        component={Select}
        name={`fields.${props.index}.value`}
        type="text"
        label="Value"
        variant="outlined"
        fullWidth
        inputProps={{
          id: `field-value-${props.index}`,
        }}
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Field>
    </FormControl>
  }

  if (props.type === 'date') {
    return <Field
      component={DatePicker}
      name={`fields.${props.index}.value`}
      label="Value"
      inputVariant="outlined"
      fullWidth
      format="yyyy-MM-dd"
    />
  }

  return <Field
    component={TextField}
    name={`fields.${props.index}.value`}
    type={props.type}
    label="Value"
    variant="outlined"
    fullWidth
  />
}

function DocumentField(props: DocumentFieldComponentProps) {
  const classes = useStyles();

  return <div className={classes.fieldArrayContainer}>
    {
      props.values.fields && props.values.fields.map((field: DocumentFieldProp, index: number) => {
        const lastItem = props.values.fields?.length === index + 1;

        return <div key={index} className={classes.fieldArrayList}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
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
                label="Display Label"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor={`field-type-${index}`} variant="outlined">Type</InputLabel>
                <Field
                  component={Select}
                  name={`fields.${index}.type`}
                  type="text"
                  label="Type"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    id: `field-type-${index}`,
                  }}
                >
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="boolean">Boolean</MenuItem>
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={lastItem ? 3 : 4}>
              <FieldValue type={field.type} index={index} />
            </Grid>
            {lastItem && <Grid item xs={12} sm={1}>
              <IconButton onClick={() => props.arrayHelpers.push({ type: 'string', label: '', value: '', displayLabel: '' })}>
                <AddIcon />
              </IconButton>
            </Grid>}
            <Grid item xs={12} sm={1}>
              <IconButton onClick={() => props.arrayHelpers.remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      })
    }
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
        fields: props.fieldSchema || [],
        displayLabel: '',
      }}
      validationSchema={createDocumentSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.submit({
          fields: values.fields && values.fields.map((field: DocumentFieldProp) => {
            const value = (() => {
              if (field.type === 'string') return field.value.toString();
              if (field.type === 'number') return field.value ? +field.value : 0;
              if (field.type === 'boolean') return field.value === 'true' ? true : false;
              if (field.type === 'date') return field.value ? new Date(field.value).getTime() : null;
            })();

            return {
              ...field,
              value,
            }
          }),
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
        ({ values, submitForm, isSubmitting, setFieldValue }) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={values && values.fields && values.fields.length > 0 ? 12 : 11}>
                <Field
                  component={TextField}
                  name="displayLabel"
                  type="text"
                  label="Display Label"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              {values && values.fields && values.fields.length === 0 && <Grid item xs={12} sm={1} className={classes.addIconContainer}>
                <IconButton onClick={() => setFieldValue('fields', [{ type: 'string', label: '', value: '', displayLabel: '' }])} >
                  <AddIcon />
                </IconButton>
              </Grid>}
            </Grid>
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