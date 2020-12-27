import { Paper } from '@material-ui/core';
import React, { useState, useReducer } from 'react';
import TodoForm from './TodoForm';
import TodoList from './todo-list/TodoList';
import * as types from './actionTypes';

function App() {
  const [todo, setTodo] = useState('');
  const [idTodos, setIdTodos] = useState(1);
  const [currentId, setCurrentId] = useState(0);

  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case types.NEW_TODO:
        return newTodo(state);
      case types.DONE_TODO:
        return doneTodo(state, action.id);
      case types.EDIT_TODO:
        return editTodo(state);
      case types.DELETE_TODO:
        return deleteTodo(state, action.id);
      case types.LIKE_TODO:
        return likeTodo(state, action.id);
      default:
        return state;
    }
  };

  const newTodo = (state) => {
    const newTodo = {
      Id: idTodos,
      Todo: todo,
      IsDone: false,
      Like: 0,
    };
    setIdTodos(idTodos + 1);
    setTodo('');
    return [newTodo, ...state];
  };

  const doneTodo = (state, id) => {
    const newTodos = state.map((element) =>
      element.Id === id
        ? element.IsDone
          ? { ...element, IsDone: false }
          : { ...element, IsDone: true }
        : element,
    );
    return newTodos;
  };

  const editTodo = (state) => {
    const editTodos = state.map((element) =>
      element.Id === currentId ? { ...element, Id: currentId, Todo: todo } : element,
    );
    setTodo('');
    setCurrentId(0);
    return editTodos;
  };

  const deleteTodo = (state, id) => {
    const updatingTodos = state.filter((element) => element.Id !== id);
    return updatingTodos;
  };

  const likeTodo = (state, id) => {
    const likeTodos = state.map((element) =>
      element.Id === id
        ? element.Like === 0
          ? { ...element, Like: 1 }
          : { ...element, Like: 0 }
        : element,
    );
    return likeTodos;
  };

  const [todos, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todo || /^\s*$/.test(todo)) {
      return;
    }
    currentId === 0 ? dispatch({ type: types.NEW_TODO }) : dispatch({ type: types.EDIT_TODO });
  };

  const handleEditTodo = (task) => {
    setTodo(task.Todo);
    setCurrentId(task.Id);
  };

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
