import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckTodo from './CheckTodo';
import LikeTodo from './LikeTodo';
import ContainerTodo from './ContainerTodo';
import MoreIcon from './MoreIcon';
import * as types from '../todoReducer/actionTypes';

const useStyles = makeStyles((theme) => ({
  done: {
    backgroundColor: theme.palette.grey[200],
  },
}));

function TodoList(props) {
  const classes = useStyles();

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
          <CheckTodo
            doneTodo={() => props.dispatch({ type: types.DONE_TODO, id: e.Id })}
            IsDone={e.IsDone}
          />
        </TableCell>
        <TableCell padding="none">
          <ContainerTodo IsDone={e.IsDone} Todo={e.Todo} />
        </TableCell>
        <TableCell padding="checkbox">
          <LikeTodo
            Like={e.Like}
            handleLikeTodo={() => props.dispatch({ type: types.LIKE_TODO, id: e.Id })}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <MoreIcon
            element={e}
            deleteTodo={() => props.dispatch({ type: types.DELETE_TODO, id: e.Id })}
            handleEditTodo={props.handleEditTodo}
          />
        </TableCell>
      </TableRow>
    ));
  };

  TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleEditTodo: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
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
