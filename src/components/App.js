import { Paper } from '@material-ui/core';
import React, { useState, useReducer } from 'react';
import TodoForm from './TodoForm';
import TodoList from './todo-list/TodoList';

function App() {
  const [todo, setTodo] = useState('');
  const [idTodos, setIdTodos] = useState(1);
  const [todos, setTodos] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todo || /^\s*$/.test(todo)) {
      return;
    }
    currentId === 0 ? createTodo() : editTodo();
  };

  const doneTodo = (id) => {
    const newTodos = todos.map((element) =>
      element.Id === id
        ? element.IsDone
          ? { ...element, IsDone: false }
          : { ...element, IsDone: true }
        : element,
    );
    setTodos(newTodos);
  };

  const createTodo = () => {
    const newTodo = {
      Id: idTodos,
      Todo: todo,
      IsDone: false,
      Like: 0,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setIdTodos(idTodos + 1);
    setTodo('');
  };

  const editTodo = () => {
    const editTodos = todos.map((element) =>
      element.Id === currentId ? { ...element, Id: currentId, Todo: todo } : element,
    );
    console.log(editTodos);
    setTodos(editTodos);
    setTodo('');
    setCurrentId(0);
  };

  const handleEditTodo = (task) => {
    setTodo(task.Todo);
    setCurrentId(task.Id);
  };

  const handleLikeTodo = (id) => {
    const likeTodos = todos.map((element) =>
      element.Id === id
        ? element.Like === 0
          ? { ...element, Like: 1 }
          : { ...element, Like: 0 }
        : element,
    );
    setTodos(likeTodos);
  };

  const deleteTodo = (task) => {
    const updatingTodos = todos.filter((e) => e.Id !== task.Id);
    setTodos(updatingTodos);
  };

  return (
    <>
      <TodoForm handleChange={handleChange} handleSubmit={handleSubmit} todo={todo} />
      <Paper>
        <TodoList
          todos={todos}
          doneTodo={doneTodo}
          handleEditTodo={handleEditTodo}
          deleteTodo={deleteTodo}
          handleLikeTodo={handleLikeTodo}
        />
      </Paper>
    </>
  );
}

export default App;
