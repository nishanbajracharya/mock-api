import React from 'react';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { addNewCollection, getCollectionList } from '../../services/collection';
import { useDocumentData } from 'react-firebase-hooks/firestore';

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

function Collections() {
  const [collections, loading] = useDocumentData<CollectionProp>(getCollectionList());

  function addCollection(collection: CollectionItemProp) {
    if (collection) {
      return addNewCollection(collection);
    }
  }

  return <div>
    <List component="nav">
      <ListItem button onClick={() => addCollection({title: 'People', route: '/people'})}>
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
  </div>;
}

export default Collections;
