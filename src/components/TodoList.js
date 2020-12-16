import React from 'react';
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

function TodoList(props) {
  const actualTodos = props.todos.filter((e) => !e.IsDone);
  const doneTodos = props.todos.filter((e) => e.IsDone);

  const createRow = (array) => {
    return array.map((e, index) => (
      <TableRow key={index}>
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
          <TableRow>
            <Typography variant="body1" color={e.IsDone ? 'textSecondary' : 'textPrimary'}>
              {e.Todo}
            </Typography>
          </TableRow>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton aria-label="edit" disableFocusRipple disableRipple edge="end">
            <EditIcon fontSize="small" />
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton aria-label="delete" disableFocusRipple disableRipple edge="end">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  TodoList.propTypes = {
    todos: PropTypes.object.isRequired,
    doneTodo: PropTypes.func.isRequired,
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {createRow(actualTodos)}
          {createRow(doneTodos)}
        </TableBody>
      </Table>
    </TableContainer>
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
