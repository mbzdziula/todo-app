import { Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './todo-list/TodoList';
import { newTodo, editTodo } from '../redux/actions/todoActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Todo(props) {
  const [todo, setTodo] = useState('');
  const [idTodos, setIdTodos] = useState(1);
  const [currentId, setCurrentId] = useState(0);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todo || /^\s*$/.test(todo)) {
      return;
    }
    currentId === 0 ? props.newTodo(idTodos, todo) : props.editTodo(currentId, todo);
  };

  const handleEditTodo = (task) => {
    setTodo(task.Todo);
    setCurrentId(task.Id);
  };

  useEffect(() => {
    setTodo('');
    console.log(props.todos);
    currentId === 0 ? setIdTodos(idTodos + 1) : setCurrentId(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.todos]);

  Todo.propTypes = {
    todos: PropTypes.array.isRequired,
    newTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
  };

  return (
    <>
      <TodoForm handleChange={handleChange} handleSubmit={handleSubmit} todo={todo} />
      <Paper>
        <TodoList handleEditTodo={handleEditTodo} />
      </Paper>
    </>
  );
}

function mapStateToProps(state) {
  return {
    todos: state,
  };
}

const mapDispatchToProps = {
  newTodo,
  editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
