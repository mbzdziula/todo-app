import { Container } from '@material-ui/core';
import React from 'react';
import App from '../src/components/App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: grey[500],
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: 10 }}>
        <App />
      </Container>
    </ThemeProvider>
  );
}
