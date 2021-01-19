import * as types from '../actions/actionTypes';
import { initialTodos as initialState } from './initialState';

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CHANGE:
      return handleChange(state, action.event);
    case types.HANDLE_CHANGE_COMMENT:
      return handleChangeComment(state, action.event);
    case types.HANDLE_CHANGE_DATE:
      return handleChangeDate(state, action.date);
    case types.HANDLE_CHANGE_PROJECT:
      return handleChangeProject(state, action.event);
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

const handleChangeProject = (state, event) => {
  const project = event.target.value;
  return {
    ...state,
    currentTask: { ...state.currentTask, Project: project },
  };
};

const handleChangeComment = (state, event) => {
  const comment = event.target.value;
  return {
    ...state,
    currentTask: { ...state.currentTask, Comment: comment },
  };
};

const handleChangeDate = (state, date) => {
  return {
    ...state,
    currentTask: { ...state.currentTask, Date: date },
  };
};

const handleEdit = (state, element) => {
  return {
    ...state,
    currentTask: {
      Id: element.Id,
      Todo: element.Todo,
      Comment: element.Comment,
      Date: element.Date,
      Project: element.Project,
    },
  };
};

const getTodosFromDb = (state, todos) => {
  return { ...state, currentTask: initialState.currentTask, todos: todos };
};

export default todoReducer;
