import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import MainDrawer from './MainDrawer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import EditDrawer from './EditDrawer';
import withWidth from '@material-ui/core/withWidth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  },
}));

function App(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainDrawer />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.mainDrawer,
        })}
      >
        <Todo />
      </main>
      <EditDrawer />
    </div>
  );
}

App.propTypes = {
  mainDrawer: PropTypes.bool.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

function mapStateToProps(state) {
  return {
    mainDrawer: state.mainDrawer,
  };
}

export default connect(mapStateToProps)(App);
