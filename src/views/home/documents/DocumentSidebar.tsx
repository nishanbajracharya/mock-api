import React from 'react';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    outline: 'none',
    border: 'none',
    borderRadius: 4,
    boxSizing: 'border-box',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: theme.breakpoints.width('sm'),
    backgroundColor: theme.palette.background.paper,
  },
  modalHeaderText: {
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
  list: {
    padding: 0,
  },
  addItem: {
    paddingTop: 10,
    paddingBottom: 9,
  },
}));

function DocumentItem(props: DocumentDataProp) {
  return <ListItem button selected={props.selected} onClick={props.onClick}>
    <ListItemText primary={props.id} />
  </ListItem>
}

function DocumentSidebar(props: DocumentSidebarComponentProps) {
  const classes = useStyles();

  function handleOpen() {

  }

  return <div>
    <List component="nav" className={classes.list}>
      <ListItem button onClick={handleOpen} className={classes.addItem}>
        <ListItemIcon><Add /></ListItemIcon>
        <ListItemText primary="Add a document" />
      </ListItem>
    </List>
    {
      props.loading && <ListItem disabled>
        <ListItemText primary={<Skeleton variant="text" />} secondary={<Skeleton variant="text" />} />
      </ListItem>
    }
    {
      props.documents && props.documents.map((doc: DocumentItemProp) => {
        const data = doc.data();

        return <DocumentItem id={data.id} key={data.id} />
      })
    }
  </div>;
}

export default DocumentSidebar;
