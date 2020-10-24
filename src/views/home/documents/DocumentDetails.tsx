import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
}));

function FieldRow(props: FieldRowProp) {
  const classes = useStyles();

  return <div>
    <span className={classes.displayLabel}>{props.field.displayLabel || props.field.label}{props.field.type && ` (${props.field.type})`}:</span> <span>{props.field.value}</span>
  </div>;
}

function DocumentDetails(props: DocumentDetailsComponentProps) {
  const classes = useStyles();

  const data: DocumentData = props.document && props.document.data();

  if (!data) {
    return <div className={classes.empty}>
      <ListIcon color="disabled" className={classes.emptyIcon} />
      <div>No Document Selected</div>
    </div>;
  }

  return <List>
    <ListItem>
      <ListItemText primary={<FieldRow field={{ displayLabel: 'ID', value: data.id }} />} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => props.onEdit && props.onEdit(data)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => props.onDelete && props.onDelete(data.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    {
      data.fields && data.fields.map((field, key) => <ListItem key={key}>
        <ListItemText primary={<FieldRow field={field} />} />
      </ListItem>)
    }
  </List>;
}

export default DocumentDetails;
