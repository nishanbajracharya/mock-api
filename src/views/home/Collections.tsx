import React from 'react';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import Backdrop from '@material-ui/core/Backdrop';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import CollectionForm from './CollectionForm';
import { addNewCollection, getCollectionList } from '../../services/collection';
import FadeSlide from '../../components/FadeSlide';

type CollectionItemProp = {
  title: string;
  route: string;
  createdAt?: number;
  updatedAt?: number;
  onClick?: () => {};
};

type CollectionProp = {
  list: [];
};

function CollectionItem(props: CollectionItemProp) {
  return <ListItem button>
    <ListItemAvatar><Avatar>{props.title[0]}</Avatar></ListItemAvatar>
    <ListItemText primary={props.title} secondary={props.route} />
  </ListItem>
}

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
}));

function Collections() {
  const [collections, loading] = useDocumentData<CollectionProp>(getCollectionList());

  function addCollection(collection: CollectionItemProp) {
    if (collection) {
      return addNewCollection({
        title: collection.title,
        route: collection.route,
      });
    }
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <div>
    <List component="nav">
      <ListItem button onClick={handleOpen}>
        <ListItemIcon><Add /></ListItemIcon>
        <ListItemText primary="Add a collection" />
      </ListItem>
      {
        collections?.list && collections.list.map((collection: CollectionItemProp, key) =>
          <CollectionItem key={key} title={collection.title} route={collection.route} />)
      }
      {
        loading && <ListItem>
          <ListItemIcon><Skeleton variant="circle" width={40} height={40} /></ListItemIcon>
          <ListItemText primary={<Skeleton variant="text" />} secondary={<Skeleton variant="text" />} />
        </ListItem>
      }
    </List>

    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <FadeSlide in={open}>
        <div className={classes.paper}>
          <div className={classes.modalHeaderText}>Enter collection details</div>
          <CollectionForm create={addCollection} handleClose={handleClose}/>
        </div>
      </FadeSlide>
    </Modal>
  </div>;
}

export default Collections;
