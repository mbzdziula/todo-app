import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionMainDrawer } from '../redux/actions/drawerActions';
import {
  newProject,
  editProject,
  deleteProject,
  projectHandleEdit,
  projectHandleChange,
  projectClearHandleEdit,
} from '../redux/actions/projectActions';

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
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: theme.palette.primary.main,
    color: '#f5f5f5',
  },
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
  listProject: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.light,
    fontSize: '50px',
  },
}));

function MainDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.currentProject.Project || /^\s*$/.test(props.currentProject.Project)) {
      return;
    }

    props.currentProject.Id === 0
      ? props.newProject(props.currentProject.Project)
      : props.editProject(props.currentProject);
  };

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
          <IconButton onClick={() => props.actionMainDrawer(false)}>
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

          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <WorkIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Projekty" />
          </ListItem>
          {show ? (
            <List className={classes.listProject}>
              {props.projects
                .filter((element) => element.Id !== props.currentProject.Id)
                .map((element, index) => (
                  <ListItem button dense key={index}>
                    <ListItemText primary={element.Project} />
                    <IconButton
                      disableRipple
                      disableFocusRipple
                      size="small"
                      edge="end"
                      onClick={() => props.projectHandleEdit(element)}
                    >
                      <CreateIcon color="disabled" />
                    </IconButton>
                    <IconButton disableRipple disableFocusRipple size="small" edge="end">
                      <DeleteIcon
                        color="disabled"
                        onClick={() => props.deleteProject(element.Id)}
                      />
                    </IconButton>
                  </ListItem>
                ))}

              <ListItem dense>
                <TextField
                  size="small"
                  margin=""
                  onChange={props.projectHandleChange}
                  value={props.currentProject.Project}
                  placeholder="Dodaj nowy projekt"
                  inputProps={{ style: { fontSize: '15px' } }}
                />
                <IconButton
                  disableRipple
                  disableFocusRipple
                  size="small"
                  edge="end"
                  onClick={handleSubmit}
                >
                  <CheckIcon color="disabled" />
                </IconButton>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  size="small"
                  edge="end"
                  onClick={() => props.projectClearHandleEdit()}
                >
                  <ClearIcon color="disabled" />
                </IconButton>
              </ListItem>
            </List>
          ) : null}
        </List>
      </Drawer>
    </>
  );
}

MainDrawer.propTypes = {
  actionMainDrawer: PropTypes.func.isRequired,
  mainDrawer: PropTypes.bool.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  newProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  projectHandleEdit: PropTypes.func.isRequired,
  projectHandleChange: PropTypes.func.isRequired,
  currentProject: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  editProject: PropTypes.func.isRequired,
  projectClearHandleEdit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    mainDrawer: state.drawerReducer.mainDrawer,
    projects: state.projectReducer.projects,
    currentProject: state.projectReducer.currentProject,
  };
}

const mapDispatchToProps = {
  actionMainDrawer,
  newProject,
  deleteProject,
  editProject,
  projectHandleEdit,
  projectHandleChange,
  projectClearHandleEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(MainDrawer));
