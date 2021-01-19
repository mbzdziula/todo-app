import React from 'react';
import App from '../../../src/components/App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import store from '../../../src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ThemeProvider>
  );
}
