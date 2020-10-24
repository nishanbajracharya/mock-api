import Add from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import React, { useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Modal from '../../../components/Modal';
import CollectionForm from './CollectionForm';
import { ROUTES } from '../../../constants/routes';
import { addNewCollection } from '../../../services/collection';

function CollectionItem(props: CollectionItemProp) {
  return <ListItem button selected={props.selected} onClick={props.onClick}>
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
  list: {
    padding: 0,
  },
  addItem: {
    paddingTop: 10,
    paddingBottom: 9,
  },
}));

function CollectionSidebar(props: CollectionComponentProps) {
  const history = useHistory();
  const params = useParams<CollectionRoute>();

  const { collections, loading, selectedItem, setSelectedItem } = props;

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

  const getCollectionItemByIndex = useCallback((list: CollectionItemProp[] | undefined, index: number) => {
    return list ? list[index] : null;
  }, []);

  const handleSelectItem = useCallback((index: number) => {
    setSelectedItem(index);

    const collection = getCollectionItemByIndex(collections?.list, index);

    if (collection) {
      history.push(collection?.route);
    }
  }, [history, getCollectionItemByIndex, collections?.list, setSelectedItem]);


  useEffect(() => {
    if (params.collection && collections && collections.list && collections.list.length > 0) {
      const collectionRoute = '/' + params.collection;

      const collectionIndex = collections.list.findIndex(c => c.route === collectionRoute);

      if (collectionIndex >= 0) {
        return handleSelectItem(collectionIndex);
      }

      history.push(ROUTES.HOME);
    }
  }, [collections, params.collection, history, handleSelectItem]);

  return <div>
    <List component="nav" className={classes.list}>
      <ListItem button onClick={handleOpen} className={classes.addItem}>
        <ListItemIcon><Add /></ListItemIcon>
        <ListItemText primary="Add a collection" />
      </ListItem>
      {
        collections?.list && collections.list.map((collection: CollectionItemProp, key) =>
          <CollectionItem
            key={key}
            title={collection.title}
            route={collection.route}
            selected={key === selectedItem}
            onClick={() => handleSelectItem(key)}
          />)
      }
      {
        loading && <ListItem>
          <ListItemIcon><Skeleton variant="circle" width={40} height={40} /></ListItemIcon>
          <ListItemText primary={<Skeleton variant="text" />} secondary={<Skeleton variant="text" />} />
        </ListItem>
      }
    </List>

    <Modal
      isOpen={open}
      className={classes.modal}
      onRequestClose={handleClose}
    >
      <div className={classes.paper}>
        <div className={classes.modalHeaderText}>Enter collection details</div>
        <CollectionForm create={addCollection} handleClose={handleClose} />
      </div>
    </Modal>
  </div>;
}

export default CollectionSidebar;
