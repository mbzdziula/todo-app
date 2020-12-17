import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  task: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  done: {
    backgroundColor: theme.palette.grey[200],
  },
}));

function TodoList(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [elementHandler, setElementHandler] = useState({});
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleElement = (element) => {
    setElementHandler(element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actualTodos = props.todos
    .filter((e) => !e.IsDone)
    .sort((a, b) => {
      return b.Like - a.Like;
    });

  const doneTodos = props.todos
    .filter((e) => e.IsDone)
    .sort((a, b) => {
      return b.Like - a.Like;
    });

  const createRow = (array) => {
    return array.map((e, index) => (
      <TableRow key={index} className={e.IsDone ? classes.done : ''}>
        <TableCell padding="checkbox">
          {e.IsDone ? (
            <IconButton
              aria-label="unCheck"
              disableFocusRipple
              disableRipple
              edge="end"
              onClick={() => props.doneTodo(e.Id)}
            >
              <CheckCircleOutlineIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="check"
              disableFocusRipple
              disableRipple
              edge="end"
              onClick={() => props.doneTodo(e.Id)}
            >
              <RadioButtonUncheckedIcon fontSize="small" />
            </IconButton>
          )}
        </TableCell>
        <TableCell padding="none">
          <Typography
            variant="body1"
            color={e.IsDone ? 'textSecondary' : 'textPrimary'}
            className={classes.task}
          >
            {e.Todo}
          </Typography>
        </TableCell>
        <TableCell padding="checkbox">
          {e.Like === 0 ? (
            <IconButton
              aria-label="unCheck"
              disableFocusRipple
              disableRipple
              edge="end"
              onClick={() => props.handleLikeTodo(e.Id)}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="check"
              disableFocusRipple
              disableRipple
              edge="end"
              color="primary"
              onClick={() => props.handleLikeTodo(e.Id)}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          )}
        </TableCell>

        <TableCell padding="checkbox">
          <IconButton
            aria-label="more"
            disableFocusRipple
            disableRipple
            edge="end"
            onMouseEnter={() => handleElement(e)}
            onClick={handleClick}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={1}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                props.handleEditTodo(elementHandler);
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="button">Edytuj</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                props.deleteTodo(elementHandler);
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="button">Usuń</Typography>
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    ));
  };

  TodoList.propTypes = {
    todos: PropTypes.object.isRequired,
    doneTodo: PropTypes.func.isRequired,
    handleEditTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    handleLikeTodo: PropTypes.func.isRequired,
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {createRow(actualTodos)}
            {createRow(doneTodos)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TodoList;
