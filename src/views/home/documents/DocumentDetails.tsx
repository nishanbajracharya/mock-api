import { format } from 'date-fns';
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Dialog from '../../../components/Dialog';

const useStyles = makeStyles(theme => ({
  displayLabel: {
    fontWeight: 500,
    color: theme.palette.text.hint,
  },
  empty: {
    color: theme.palette.text.disabled,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: '4rem',
    margin: theme.spacing(1),
  },
  deleteButton: {
    background: theme.palette.error.main,
    '&:hover': {
      background: theme.palette.error.dark
    },
    '&:active': {
      background: theme.palette.error.light,
    }
  },
}));

function FieldRow(props: FieldRowProp) {
  const classes = useStyles();

  const value = (() => {
    if (props.field.type === 'boolean') {
      if (props.field.value === false) return 'False';
      if (props.field.value === true) return 'True';

      return '';
    }

    if (props.field.type === 'number') {
      return props.field.value;
    }

    if (!props.field.value) return '';

    if (props.field.type === 'date') {
      if (typeof props.field.value === 'string') return props.field.value;

      return format(props.field.value, 'yyyy-MM-dd');
    }
    return props.field.value.toString();
  })();

  return <div>
    <span className={classes.displayLabel}>{props.field.displayLabel || props.field.label}{props.field.type && ` (${props.field.type})`}:</span> <span>{value}</span>
  </div>;
}

function DocumentDetails(props: DocumentDetailsComponentProps) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const data: DocumentData = props.document && props.document.data();

  if (!data) {
    return <div className={classes.empty}>
      <ListIcon color="disabled" className={classes.emptyIcon} />
      <div>No Document Selected</div>
    </div>;
  }


  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDeleteDocument() {
    setTimeout(() => props.onDelete && props.onDelete(data.id), 250);
    handleCloseDialog();
  }


  return <List>
    <ListItem>
      <ListItemText primary={<FieldRow field={{ displayLabel: 'ID', value: data.id }} />} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => props.onEdit && props.onEdit(data)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => setOpenDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    {
      data.fields && data.fields.filter(field => field.label || field.displayLabel).map((field, key) => <ListItem key={key}>
        <ListItemText primary={<FieldRow field={field} />} />
      </ListItem>)
    }

    <Dialog
      open={openDialog}
      cancelButtonText="Cancel"
      successButtonText="Yes, Delete"
      handleClose={handleCloseDialog}
      handleSuccess={handleDeleteDocument}
      dialogTitle="Do you want to delete this document?"
      successButtonProps={{
        variant: 'contained',
        startIcon: <DeleteIcon />,
        className: classes.deleteButton,
      }}
    />
  </List>;
}

export default DocumentDetails;
