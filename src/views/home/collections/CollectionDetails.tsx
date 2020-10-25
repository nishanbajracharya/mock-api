import Document from '../documents';
import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { useParams } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '../../../components/Dialog';

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
    padding: '2px 16px 1px',
    borderBottom: '1px solid #ddd',
    justifyContent: 'space-between',
    background: theme.palette.background.default,
  },
  content: {
    height: '100%',
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

function CollectionDetails(props: CollectionDetailComponentProps) {
  const classes = useStyles();
  const params = useParams<CollectionRoute>();
  const [openDialog, setOpenDialog] = useState(false);

  if (!params.collection) {
    return <div className={classes.empty}>
      <ListIcon color="disabled" className={classes.emptyIcon} />
      <div>No Collection Selected</div>
    </div>;
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDeleteDocument() {
    setTimeout(() => props.onDelete && props.onDelete(props.collection), 250);
    handleCloseDialog();
  }

  return <div className={classes.content}>
    <div className={classes.header}>
      <div>
        {props.collection?.title}
      </div>
      <div>
        <Link href={`/api/collections/${params.collection}`} target="_blank" rel="noopener">
          <IconButton edge="end">
            <LaunchIcon />
          </IconButton>
        </Link>
        <IconButton edge="end" aria-label="delete" onClick={() => setOpenDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
    <Document collection={props.collection} collections={props.collections} />
    <Dialog
      open={openDialog}
      cancelButtonText="Cancel"
      successButtonText="Yes, Delete"
      handleClose={handleCloseDialog}
      handleSuccess={handleDeleteDocument}
      dialogTitle="Do you want to delete this collection?"
      successButtonProps={{
        variant: 'contained',
        startIcon: <DeleteIcon />,
        className: classes.deleteButton,
      }}
      dialogText="All the documents in this collection will also be deleted."
    />
  </div>;
}

export default CollectionDetails;
