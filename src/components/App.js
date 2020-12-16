import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todo, setTodo] = useState();
  const [idTodos, setIdTodos] = useState(0);
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
          ? { Id: element.Id, Todo: element.Todo, IsDone: false, Lile: element.Like }
          : { Id: element.Id, Todo: element.Todo, IsDone: true, Like: element.Like }
        : { Id: element.Id, Todo: element.Todo, IsDone: element.IsDone, Like: element.Like },
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
    const editTodos = todos.map((e) =>
      e.Id === currentId
        ? { Id: currentId, Todo: todo, IsDone: e.IsDone, Like: e.Like }
        : { Id: e.Id, Todo: e.Todo, IsDone: e.IsDone, Like: e.Like },
    );
    setTodos(editTodos);
    setTodo('');
    setCurrentId(0);
  };

  const handleEditTodo = (task) => {
    setTodo(task.Todo);
    setCurrentId(task.Id);
  };

  const handleLikeTodo = (id) => {
    const likeTodos = todos.map((e) =>
      e.id === id
        ? e.Like === 0
          ? { Id: e.Id, Todo: e.Todo, IsDone: e.IsDone, Like: 1 }
          : { Id: e.Id, Todo: e.Todo, IsDone: e.IsDone, Like: 0 }
        : { Id: e.Id, Todo: e.Todo, IsDone: e.IsDone, Like: e.Like },
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
