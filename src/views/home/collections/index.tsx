import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import CollectionSidebar from './CollectionSidebar';
import CollectionDetails from './CollectionDetails';
import { deleteCollection, getCollectionList } from '../../../services/collection';

const useStyles = makeStyles(theme => ({
  header: {
    fontWeight: 500,
    padding: theme.spacing(2),
    borderBottom: '1px solid #ddd',
    background: theme.palette.background.default,
  },
  sidebar: {
    paddingRight: 0,
    minHeight: '50vh',
    borderRight: '1px solid #ddd',
  },
}));

function Collections() {
  const classes = useStyles();

  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [collections, loading] = useDocumentData<CollectionProp>(getCollectionList());

  function handleDelete(collection: CollectionItemProp | null | undefined) {
    return deleteCollection(collection, collections?.list);
  }

  return (
    <Paper elevation={2}>
      <div className={classes.header}>Collections</div>
      <Grid container>
        <Grid item xs={12} sm={3} className={classes.sidebar}>
          <CollectionSidebar collections={collections} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <CollectionDetails onDelete={handleDelete} collection={selectedItem !== null ? collections?.list[selectedItem] : null} collections={collections?.list} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Collections;
