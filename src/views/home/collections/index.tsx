import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import CollectionSidebar from './CollectionSidebar';
import CollectionDetails from './CollectionDetails';
import { deleteCollection, getCollectionList } from '../../../services/collection';

const useStyles = makeStyles(theme => ({
  header: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    padding: '2px 16px 1px',
    borderBottom: '1px solid #ddd',
    justifyContent: 'space-between',
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
      <div className={classes.header}>Collections
        <Link href="/api/collections" target="_blank" rel="noopener">
          <IconButton edge="end">
            <LaunchIcon />
          </IconButton>
        </Link>
      </div>
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
