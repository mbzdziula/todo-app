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
    case types.MAIN_DRAWER_OPEN:
      return mainDrawerOpen(state);
    case types.MAIN_DRAWER_CLOSE:
      return mainDrawerClose(state);
    case types.ACTION_EDIT_DRAWER:
      return actionEditDrawer(state, action.open);
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

const mainDrawerOpen = (state) => {
  return { ...state, mainDrawer: true };
};

const mainDrawerClose = (state) => {
  return { ...state, mainDrawer: false };
};

const actionEditDrawer = (state, open) => {
  return { ...state, editDrawer: open };
};

export default todoReducer;
