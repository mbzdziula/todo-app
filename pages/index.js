import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10),
  },
}));

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
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    router.push('/Skrzynka spraw/main');
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CircularProgress size={150} color="primary" />
      </div>
    </ThemeProvider>
  );
}
