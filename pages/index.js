import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { red, green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

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
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  button: {
    margin: theme.spacing(10),
    width: '50%',
    color: 'white',
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://todo-app-mb.herokuapp.com/">
        My Todo App
      </Link>{' '}
      2021.
    </Typography>
  );
}

export default function Home() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            My Todo App
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Prosta aplikacja do zarządzania zadaniami. Zapraszam do testowania.
          </Typography>
          <Typography variant="body1">
            Kliknij poniższy przycisk, aby przejść do strony logowania.
          </Typography>

          <Button
            href="/api/login"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            Zaloguj się
          </Button>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">Czas na relax.</Typography>
            <Copyright />
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
}
