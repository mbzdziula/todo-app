import * as types from '../actions/actionTypes';
import initialState from './initialState';

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_TODO:
      return newTodo(state);
    case types.DONE_TODO:
      return doneTodo(state, action.id);
    case types.EDIT_TODO:
      return editTodo(state, action.currentId, action.todo);
    case types.DELETE_TODO:
      return deleteTodo(state, action.id);
    case types.LIKE_TODO:
      return likeTodo(state, action.id);
    case types.HANDLE_CHANGE:
      return handleChange(state, action.event);
    case types.HANDLE_EDIT:
      return handleEdit(state, action.element);
    default:
      return state;
  }
};

const newTodo = (state) => {
  const newTodo = {
    Id: state.idTodos,
    Todo: state.currentTask.Todo,
    IsDone: false,
    Like: 0,
  };
  const newIdTodos = state.idTodos + 1;

  return {
    todos: [newTodo, ...state.todos],
    currentTask: initialState.currentTask,
    idTodos: newIdTodos,
  };
};

const doneTodo = (state, id) => {
  const doneTodos = state.todos.map((element) =>
    element.Id === id
      ? element.IsDone
        ? { ...element, IsDone: false }
        : { ...element, IsDone: true }
      : element,
  );
  return { ...state, todos: doneTodos };
};

const editTodo = (state) => {
  const editTodos = state.todos.map((element) =>
    element.Id === state.currentTask.Id
      ? { ...element, Id: state.currentTask.Id, Todo: state.currentTask.Todo }
      : element,
  );
  return { ...state, todos: editTodos, currentTask: initialState.currentTask };
};

const deleteTodo = (state, id) => {
  const updatingTodos = state.todos.filter((element) => element.Id !== id);
  return { ...state, todos: updatingTodos };
};

const likeTodo = (state, id) => {
  const likeTodos = state.todos.map((element) =>
    element.Id === id
      ? element.Like === 0
        ? { ...element, Like: 1 }
        : { ...element, Like: 0 }
      : element,
  );
  return { ...state, todos: likeTodos };
};

const handleChange = (state, event) => {
  const todo = event.target.value;
  return {
    todos: state.todos,
    currentTask: { ...state.currentTask, Todo: todo },
    idTodos: state.idTodos,
  };
};

const handleEdit = (state, element) => {
  return {
    ...state,
    currentTask: { ...state.currentTask, Id: element.Id, Todo: element.Todo },
  };
};

export default todoReducer;
