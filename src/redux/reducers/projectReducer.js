import * as types from '../actions/actionTypes';
import { initialProjects as initialState } from './initialState';

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_HANDLE_CHANGE:
      return projectHandleChange(state, action.event);
    case types.PROJECT_HANDLE_EDIT:
      return projectHandleEdit(state, action.element);
    case types.GET_PROJECTS_FROM_DB:
      return getProjectsFromDb(state, action.projects);
    case types.PROJECT_CLEAR_HANDLE_EDIT:
      return projectClearHandleEdit(state);
    default:
      return state;
  }
};

const projectHandleChange = (state, event) => {
  const project = event.target.value;
  return {
    ...state,
    currentProject: { ...state.currentProject, Project: project },
  };
};

const projectHandleEdit = (state, element) => {
  return {
    ...state,
    currentProject: {
      Id: element.Id,
      Project: element.Project,
    },
  };
};

const projectClearHandleEdit = (state) => {
  return { ...state, currentProject: initialState.currentProject };
};

const getProjectsFromDb = (state, projects) => {
  return { ...state, currentProject: initialState.currentProject, projects: projects };
};

export default projectReducer;
