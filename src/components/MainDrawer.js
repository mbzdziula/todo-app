import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mainDrawerOpen, mainDrawerClose } from '../redux/actions/todoActions';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import withWidth from '@material-ui/core/withWidth';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WorkIcon from '@material-ui/icons/Work';
import TodayIcon from '@material-ui/icons/Today';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main,
    color: '#f5f5f5',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icon: {
    color: '#fafafa',
  },
}));

function MainDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.width !== 'xs' ? true : props.mainDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        display="none"
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.mainDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon className={classes.icon} />
            ) : (
              <ChevronRightIcon className={classes.icon} />
            )}
          </IconButton>
        </div>
        <Divider light variant="middle" />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Elo mordo!" />
          </ListItem>
        </List>
        <Divider light variant="middle" />
        <List>
          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Priorytety" />
          </ListItem>
          <ListItem button selected>
            <ListItemIcon>
              <InboxIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Skrzynka spraw" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Projekty" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TodayIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Kalendarz" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

MainDrawer.propTypes = {
  mainDrawerClose: PropTypes.func.isRequired,
  mainDrawerOpen: PropTypes.func.isRequired,
  mainDrawer: PropTypes.bool.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

function mapStateToProps(state) {
  return {
    mainDrawer: state.mainDrawer,
  };
}

const mapDispatchToProps = {
  mainDrawerOpen,
  mainDrawerClose,
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(MainDrawer));
