import * as types from './actionTypes';

export function newTodo(idTodos, todo) {
  return { type: types.NEW_TODO, idTodos, todo };
}

export function doneTodo(id) {
  return { type: types.DONE_TODO, id };
}

export function editTodo(currentId, todo) {
  return { type: types.EDIT_TODO, currentId, todo };
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id };
}

export function likeTodo(id) {
  return { type: types.LIKE_TODO, id };
}
