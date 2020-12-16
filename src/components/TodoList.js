import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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

function TodoList(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [elementHandler, setElementHandler] = useState({});
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleElement = (element) => {
    setElementHandler(element);
    console.log(elementHandler);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actualTodos = props.todos.filter((e) => !e.IsDone);
  const doneTodos = props.todos.filter((e) => e.IsDone);

  const createRow = (array) => {
    return array.map((e, index) => (
      <TableRow key={index} selected={e.IsDone} hover>
        <TableCell padding="checkbox">
          {e.IsDone ? (
            <IconButton
              aria-label="unCheck"
              disableFocusRipple
              disableRipple
              edge="end"
              color="secondary"
              onClick={() => props.doneTodo(e.Id)}
            >
              <CheckCircleIcon fontSize="small" />
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
          <Typography variant="body1" color={e.IsDone ? 'textSecondary' : 'textPrimary'}>
            {e.Todo}
          </Typography>
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

{
  /* SECOND ROW FORM DETAILS

                <TableRow>
                  <TableCell padding="none" style={{ border: 0 }}>
                    <Typography variant="caption" color="textSecondary">
                      {e.Id}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none" style={{ border: 0 }}>
                    <Typography variant="caption" color="textSecondary">
                      15.12.2020
                    </Typography>
                  </TableCell>
                </TableRow> */
}

// FAV ICON

//         <TableCell padding="checkbox">
//           {e.Like === 0 ? (
//             <IconButton
//               aria-label="unCheck"
//               disableFocusRipple
//               disableRipple
//               edge="end"
//               color="secondary"
//               onClick={() => props.handleLikeTodo(e.Id)}
//             >
//               <FavoriteBorderIcon fontSize="small" />
//             </IconButton>
//           ) : (
//             <IconButton
//               aria-label="check"
//               disableFocusRipple
//               disableRipple
//               edge="end"
//               onClick={() => props.handleLikeTodo(e.Id)}
//             >
//               <FavoriteIcon fontSize="small" />
//             </IconButton>
//           )}
//         </TableCell>;
