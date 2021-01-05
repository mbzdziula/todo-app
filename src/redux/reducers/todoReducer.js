import * as types from '../actions/actionTypes';
import initialState from './initialState';

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CHANGE:
      return handleChange(state, action.event);
    case types.HANDLE_EDIT:
      return handleEdit(state, action.element);
    case types.GET_TODOS_FROM_DB:
      return getTodosFromDb(state, action.todos);
    default:
      return state;
  }
};

const handleChange = (state, event) => {
  const todo = event.target.value;
  return {
    ...state,
    currentTask: { ...state.currentTask, Todo: todo },
  };
};

const handleEdit = (state, element) => {
  return {
    ...state,
    currentTask: { Id: element.Id, Todo: element.Todo },
  };
};

const getTodosFromDb = (state, todos) => {
  return { ...state, currentTask: initialState.currentTask, todos: todos };
};

export default todoReducer;
