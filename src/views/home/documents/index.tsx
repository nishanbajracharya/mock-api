import React from 'react';
import Grid from '@material-ui/core/Grid';
import DocumentSidebar from './DocumentSidebar';
import { makeStyles } from '@material-ui/core/styles';
import { useCollection } from 'react-firebase-hooks/firestore';

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
  const classes = useStyles();

  const [documents, loading] = useCollection(props.collection?.route ? getDocumentList(props.collection?.route) : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  return <Grid container className={classes.container}>
    <Grid item xs={12} sm={4} className={classes.sidebar}>
      <DocumentSidebar documents={documents?.docs} loading={loading}/>
    </Grid>
    <Grid item xs={12} sm={8}>Document</Grid>
  </Grid>
}

export default Document;
