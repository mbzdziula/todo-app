import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import TodoForm from './TodoForm';

import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

function Nav(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.width !== 'xs' ? true : props.mainDrawer,
      })}
      color="default"
      elevation={1}
    >
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Typography variant="overline" color="textSecondary" noWrap>
            {router.query.category}
            {router.query.project !== 'main' ? ` | ${router.query.project}` : ''}
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <TodoForm />
    </AppBar>
  );
}

Nav.propTypes = {
  mainDrawer: PropTypes.bool.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

function mapStateToProps(state) {
  return {
    mainDrawer: state.drawerReducer.mainDrawer,
  };
}

export default connect(mapStateToProps)(withWidth()(Nav));
