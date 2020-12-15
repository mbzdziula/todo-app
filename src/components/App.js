import { Paper } from '@material-ui/core';
import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  return (
    <>
      <TodoForm />
      <Paper>
        <TodoList />
      </Paper>
    </>
  );
}

export default App;
