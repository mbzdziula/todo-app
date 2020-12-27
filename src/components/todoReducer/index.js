import * as types from './actionTypes';

const todoReducer = (state, action) => {
  switch (action.type) {
    case types.NEW_TODO:
      return newTodo(state, action.idTodos, action.todo);
    case types.DONE_TODO:
      return doneTodo(state, action.id);
    case types.EDIT_TODO:
      return editTodo(state, action.currentId, action.todo);
    case types.DELETE_TODO:
      return deleteTodo(state, action.id);
    case types.LIKE_TODO:
      return likeTodo(state, action.id);
    default:
      return state;
  }
};

const newTodo = (state, idTodos, todo) => {
  const newTodo = {
    Id: idTodos,
    Todo: todo,
    IsDone: false,
    Like: 0,
  };
  return [newTodo, ...state];
};

const doneTodo = (state, id) => {
  const newTodos = state.map((element) =>
    element.Id === id
      ? element.IsDone
        ? { ...element, IsDone: false }
        : { ...element, IsDone: true }
      : element,
  );
  return newTodos;
};

const editTodo = (state, currentId, todo) => {
  const editTodos = state.map((element) =>
    element.Id === currentId ? { ...element, Id: currentId, Todo: todo } : element,
  );
  return editTodos;
};

const deleteTodo = (state, id) => {
  const updatingTodos = state.filter((element) => element.Id !== id);
  return updatingTodos;
};

const likeTodo = (state, id) => {
  const likeTodos = state.map((element) =>
    element.Id === id
      ? element.Like === 0
        ? { ...element, Like: 1 }
        : { ...element, Like: 0 }
      : element,
  );
  return likeTodos;
};

export default todoReducer;
