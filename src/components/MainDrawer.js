import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

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
import { fetchTodos } from '../redux/actions/todoActions';

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
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  const router = useRouter();

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !props.currentProject.Project ||
      /^\s*$/.test(props.currentProject.Project) ||
      props.projects.filter((element) => element.Project === props.currentProject.Project)
        .length !== 0
    ) {
      return;
    }

    if (props.currentProject.Id === 0) {
      props.newProject(props.currentProject.Project);
      return;
    }

    await props.editProject(props.currentProject);
    await props.fetchTodos();
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
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={`${props.user}`} />
          </ListItem>
          <a href="/api/logout">
            <ListItem dense button>
              <ListItemIcon>
                <ExitToAppIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Wyloguj się" />
            </ListItem>
          </a>
        </List>
        <Divider light variant="middle" />
        <List>
          <ListItem
            button
            selected={router.query.category === 'Skrzynka spraw'}
            onClick={() => props.actionMainDrawer(false)}
          >
            <ListItemIcon>
              <InboxIcon className={classes.icon} />
            </ListItemIcon>
            <Link as="../Skrzynka spraw/main" href="/[category]/[project]">
              <ListItemText primary="Skrzynka spraw" />
            </Link>
          </ListItem>
          <ListItem
            button
            selected={router.query.category === 'Priorytety'}
            onClick={() => props.actionMainDrawer(false)}
          >
            <ListItemIcon>
              <FavoriteIcon className={classes.icon} />
            </ListItemIcon>
            <Link as="../Priorytety/main" href="/[category]/[project]">
              <ListItemText primary="Priorytety" />
            </Link>
          </ListItem>

          <ListItem button onClick={handleClick} selected={router.query.category === 'Projekty'}>
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
                  <ListItem
                    button
                    dense
                    key={index}
                    selected={router.query.project === element.Project}
                  >
                    <Link as={`../Projekty/${element.Project}`} href="/[category]/[project]">
                      <ListItemText
                        primary={element.Project}
                        onClick={() => {
                          props.actionMainDrawer(false), handleClick();
                        }}
                      />
                    </Link>
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
                        onClick={async () => {
                          await props.deleteProject(element.Id);
                          await props.fetchTodos();
                        }}
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
                  inputProps={{ style: { fontSize: '15px' }, maxLength: 20 }}
                  maxLength={30}
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
  fetchTodos: PropTypes.func.isRequired,
  user: PropTypes.string,
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
  fetchTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(MainDrawer));
