import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import DocumentSidebar from './DocumentSidebar';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCollection } from 'react-firebase-hooks/firestore';

import DocumentDetails from './DocumentDetails';
import { getDocumentList } from '../../../services/collection';

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100% - 52px)',
  },
  sidebar: {
    height: '100%',
    paddingRight: 0,
    borderRight: '1px solid #ddd',
  },
}));

function Document(props: DocumentComponentProps) {
  const params = useParams<CollectionRoute>();

  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [documents, loading] = useCollection(props.collection?.route ? getDocumentList(props.collection?.route) : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  useEffect(() => {
    setSelectedItem(null);
  }, [params.collection])

  return <Grid container className={classes.container}>
    <Grid item xs={12} sm={4} className={classes.sidebar}>
      <DocumentSidebar documents={documents?.docs} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    </Grid>
    <Grid item xs={12} sm={8}><DocumentDetails document={selectedItem !== null && documents ? documents?.docs[selectedItem] : null}/></Grid>
  </Grid>
}

export default Document;
