import React from 'react';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../common/AppBar';
import Collections from './collections';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(6),
  },
}));

function Home() {
  const classes = useStyles();

  return <Fade in>
    <div>
      <AppBar />
      <Container className={classes.container}>
        <Collections />
      </Container>
    </div>
  </Fade>;
}

export default Home;
