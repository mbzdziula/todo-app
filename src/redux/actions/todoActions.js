import * as types from './actionTypes';
import axios from 'axios';

export function handleChange(event) {
  return { type: types.HANDLE_CHANGE, event };
}

export function handleEdit(element) {
  return { type: types.HANDLE_EDIT, element };
}

export function handleChangeComment(event) {
  return { type: types.HANDLE_CHANGE_COMMENT, event };
}

export function handleChangeDate(date) {
  return { type: types.HANDLE_CHANGE_DATE, date };
}

export function handleChangeProject(element) {
  return { type: types.HANDLE_CHANGE_PROJECT, element };
}

export function getTodosFromDb(todos) {
  return { type: types.GET_TODOS_FROM_DB, todos };
}

const axiosTodos = axios.create({
  baseURL: 'https://todo-app-mb.herokuapp.com/api/todos',
});

export function fetchTodos() {
  return (dispatch) => {
    axiosTodos.get('').then(async (response) => {
      const todos = response.data;
      dispatch(getTodosFromDb(todos));
    });
  };
}

export function newTodo(todo) {
  return async (dispatch) => {
    const Todo = todo;
    await axiosTodos.post('', Todo);
    dispatch(fetchTodos());
  };
}

export function deleteTodo(id) {
  return async (dispatch) => {
    const Todo = { Id: id };
    await axiosTodos.delete('', { data: Todo });
    dispatch(fetchTodos());
  };
}

export function doneTodo(element) {
  return async (dispatch) => {
    let Todo;
    if (element.IsDone) {
      Todo = { Id: element.Id, IsDone: false };
    } else {
      Todo = { Id: element.Id, IsDone: true };
    }
    await axiosTodos.patch('', Todo);
    dispatch(fetchTodos());
  };
}

export function likeTodo(element) {
  return async (dispatch) => {
    let Todo;
    if (element.Like === 0) {
      Todo = { Id: element.Id, Like: 1 };
    } else {
      Todo = { Id: element.Id, Like: 0 };
    }
    await axiosTodos.patch('', Todo);
    dispatch(fetchTodos());
  };
}

export function editTodo(element) {
  return async (dispatch) => {
    const Todo = element;
    await axiosTodos.patch('', Todo);
    dispatch(fetchTodos());
  };
}
