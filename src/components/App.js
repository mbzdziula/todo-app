import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todo, setTodo] = useState();
  const [idTodos, setIdTodos] = useState(0);
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    setTodo(event.target.value);
    // console.log(todo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTodo = {
      Id: idTodos,
      Todo: todo,
      IsDone: false,
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setIdTodos(idTodos + 1);
    setTodo('');
  };

  const doneTodo = (id) => {
    const newTodos = todos.map((element) =>
      element.Id === id
        ? element.IsDone
          ? { Id: element.Id, Todo: element.Todo, IsDone: false }
          : { Id: element.Id, Todo: element.Todo, IsDone: true }
        : { Id: element.Id, Todo: element.Todo, IsDone: element.IsDone },
    );
    setTodos(newTodos);
  };

  return (
    <>
      <TodoForm handleChange={handleChange} handleSubmit={handleSubmit} todo={todo} />
      <Paper>
        <TodoList todos={todos} doneTodo={doneTodo} />
      </Paper>
    </>
  );
}

export default App;
