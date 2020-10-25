import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/deepOrange';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: orange[500],
    },
    text: {
      primary: grey[900],
    }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
});

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default Root;
