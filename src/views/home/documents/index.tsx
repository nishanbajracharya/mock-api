import React from 'react';
import Grid from '@material-ui/core/Grid';
import DocumentSidebar from './DocumentSidebar';
import { makeStyles } from '@material-ui/core/styles';

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

function Document() {
  const classes = useStyles();

  return <Grid container className={classes.container}>
  <Grid item xs={12} sm={4} className={classes.sidebar}>
    <DocumentSidebar />
  </Grid>
  <Grid item xs={12} sm={8}>Document</Grid>
</Grid>
}

export default Document;
