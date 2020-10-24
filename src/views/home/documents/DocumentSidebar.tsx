import React from 'react';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
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
    <ListItemText primary={props.document.displayLabel && props.document.displayLabel.trim() ? props.document.displayLabel.trim() : props.id} />
  </ListItem>
}

function DocumentSidebar(props: DocumentSidebarComponentProps) {
  const classes = useStyles();

  return <div>
    <List component="nav" className={classes.list}>
      <ListItem button onClick={props.handleOpenModal} className={classes.addItem}>
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

        return <DocumentItem
          id={data.id}
          key={data.id}
          document={data}
          selected={props.selectedItem === data.id}
          onClick={() => props.setSelectedItem(props.selectedItem === data.id ? null : data.id)}
        />
      })
    }
  </div>;
}

export default DocumentSidebar;
