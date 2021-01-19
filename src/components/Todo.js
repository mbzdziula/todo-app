import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditDrawer from './EditDrawer';
import TodoList from './todo-list/TodoList';
import MainDrawer from './MainDrawer';
import Nav from './Nav';

import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';

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
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  marginAppBar: {
    marginTop: 80,
  },
}));

function Todo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Nav />
      <MainDrawer />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.width !== 'xs' ? true : props.mainDrawer,
        })}
      >
        <div className={classes.marginAppBar} />

        <Paper>
          <TodoList />
        </Paper>
      </main>
      <EditDrawer />
    </div>
  );
}

Todo.propTypes = {
  mainDrawer: PropTypes.bool.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

function mapStateToProps(state) {
  return {
    mainDrawer: state.drawerReducer.mainDrawer,
  };
}

export default connect(mapStateToProps)(withWidth()(Todo));
