import React from 'react';
import Document from '../documents';
import { useParams } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
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
    fontWeight: 500,
    padding: theme.spacing(2),
    borderBottom: '1px solid #ddd',
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
    <div className={classes.header}>{props.collection?.title}</div>
    <Document collection={props.collection}/>
  </div>;
}

export default CollectionDetails;