import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Provider as ReduxProvider } from 'react-redux';
import store from '../../../src/redux/store';

import auth0 from '../../api/utils/auth0';
import App from '../../../src/components/App';

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10),
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (!props.user) {
      router.push('/');
      return;
    }
  }, []);

  if (props.user) {
    return (
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <App user={props.user.name} />
        </ReduxProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CircularProgress size={150} color="primary" />
      </div>
    </ThemeProvider>
  );
}

Home.propTypes = {
  user: PropTypes.string,
};

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  return { props: { user: session?.user || null } };
}
