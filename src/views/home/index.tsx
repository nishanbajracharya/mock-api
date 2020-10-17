import React from 'react';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../common/AppBar';
import Collections from './Collections';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(6),
  },
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
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <Fade in={true}>
      <div>
        <AppBar />
        <Container className={classes.container}>
          <Paper elevation={2}>
            <div className={classes.header}>Collections</div>
            <Grid container>
              <Grid item xs={12} sm={3} className={classes.sidebar}><Collections /></Grid>
              <Grid item xs={12} sm={9}></Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </Fade>
  );
}

export default Home;
