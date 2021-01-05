import * as types from './actionTypes';
import axios from 'axios';

export function handleChange(event) {
  return { type: types.HANDLE_CHANGE, event };
}

export function handleEdit(element) {
  return { type: types.HANDLE_EDIT, element };
}

export function getTodosFromDb(todos) {
  return { type: types.GET_TODOS_FROM_DB, todos };
}

const axiosTodos = axios.create({
  baseURL: 'https://sheltered-brushlands-63640.herokuapp.com/api/todos',
});

export function fetchTodos() {
  return (dispatch) => {
    axiosTodos.get('').then((response) => {
      const todos = response.data;
      dispatch(getTodosFromDb(todos));
    });
  };
}

export function newTodo(todo) {
  return (dispatch) => {
    const Todo = { Todo: todo };
    axiosTodos.post('', Todo).then(dispatch(fetchTodos()));
  };
}

export function deleteTodo(id) {
  return (dispatch) => {
    const Todo = { Id: id };
    axiosTodos.delete('', { data: Todo }).then(dispatch(fetchTodos()));
  };
}

export function doneTodo(element) {
  return (dispatch) => {
    let Todo;
    if (element.IsDone) {
      Todo = { Id: element.Id, IsDone: false };
    } else {
      Todo = { Id: element.Id, IsDone: true };
    }
    axiosTodos.patch('', Todo).then(dispatch(fetchTodos()));
  };
}

export function likeTodo(element) {
  return (dispatch) => {
    let Todo;
    if (element.Like === 0) {
      Todo = { Id: element.Id, Like: 1 };
    } else {
      Todo = { Id: element.Id, Like: 0 };
    }
    axiosTodos.patch('', Todo).then(dispatch(fetchTodos()));
  };
}

export function editTodo(id, todo) {
  return (dispatch) => {
    const Todo = { Id: id, Todo: todo };
    axiosTodos.patch('', Todo).then(dispatch(fetchTodos()));
  };
}
