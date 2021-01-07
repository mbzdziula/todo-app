import { Paper } from '@material-ui/core';
import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './todo-list/TodoList';

function Todo() {
  return (
    <>
      <TodoForm />
      <Paper>
        <TodoList />
      </Paper>
    </>
  );
}

export default Todo;
