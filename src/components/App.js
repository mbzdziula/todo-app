import { Paper } from '@material-ui/core';
import React, { useState, useReducer, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './todo-list/TodoList';
import * as types from './todoReducer/actionTypes';
import todoReducer from './todoReducer';
import initialState from './todoReducer/initialState';

function App() {
  const [todo, setTodo] = useState('');
  const [idTodos, setIdTodos] = useState(1);
  const [currentId, setCurrentId] = useState(0);

  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todo || /^\s*$/.test(todo)) {
      return;
    }
    currentId === 0
      ? dispatch({ type: types.NEW_TODO, idTodos, todo })
      : dispatch({ type: types.EDIT_TODO, currentId, todo });
  };

  const handleEditTodo = (task) => {
    setTodo(task.Todo);
    setCurrentId(task.Id);
  };

  useEffect(() => {
    setTodo('');
    currentId === 0 ? setIdTodos(idTodos + 1) : setCurrentId(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  return (
    <>
      <TodoForm handleChange={handleChange} handleSubmit={handleSubmit} todo={todo} />
      <Paper>
        <TodoList todos={todos} dispatch={dispatch} handleEditTodo={handleEditTodo} />
      </Paper>
    </>
  );
}

export default App;
