import React from 'react';
import Document from '../documents';
import { useParams } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
  header: {
    display: 'flex',
    fontWeight: 500,
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    borderBottom: '1px solid #ddd',
    justifyContent: 'space-between',
    background: theme.palette.background.default,
  },
  content: {
    height: '100%',
  },
}));

function CollectionDetails(props: CollectionDetailComponentProps) {
  const classes = useStyles();
  const params = useParams<CollectionRoute>();

  if (!params.collection) {
    return <div className={classes.empty}>
      <ListIcon color="disabled" className={classes.emptyIcon} />
      <div>No Collection Selected</div>
    </div>;
  }

  return <div className={classes.content}>
    <div className={classes.header}>
      <div>{props.collection?.title}</div>
      <IconButton edge="end" aria-label="delete" onClick={() => props.onDelete && props.onDelete(props.collection)}>
        <DeleteIcon />
      </IconButton>
    </div>
    <Document collection={props.collection} />
  </div>;
}

export default CollectionDetails;
