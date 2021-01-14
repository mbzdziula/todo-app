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
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import withWidth from '@material-ui/core/withWidth';

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
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Zaloguj się" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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
