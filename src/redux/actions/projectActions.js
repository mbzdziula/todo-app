import * as types from './actionTypes';
import axios from 'axios';

export function getProjectsFromDb(projects) {
  return { type: types.GET_PROJECTS_FROM_DB, projects };
}

export function projectHandleChange(event) {
  return { type: types.PROJECT_HANDLE_CHANGE, event };
}

export function projectHandleEdit(element) {
  return { type: types.PROJECT_HANDLE_EDIT, element };
}

export function projectClearHandleEdit() {
  return { type: types.PROJECT_CLEAR_HANDLE_EDIT };
}

const axiosProjects = axios.create({
  baseURL: 'https://todo-app-mb.herokuapp.com/api/projects',
});

const axiosProjectsUpdate = axios.create({
  baseURL: 'https://todo-app-mb.herokuapp.com/api/uptade_project',
});

export function fetchProjects() {
  return (dispatch) => {
    axiosProjects.get('').then(async (response) => {
      const projects = response.data;
      dispatch(getProjectsFromDb(projects));
    });
  };
}

export function newProject(project) {
  return async (dispatch) => {
    const Project = { Project: project };
    await axiosProjects.post('', Project);
    dispatch(fetchProjects());
  };
}

export function deleteProject(id) {
  return async (dispatch) => {
    await axiosProjects.delete('', { data: { Id: id } });
    await axiosProjectsUpdate.delete('', { data: { Id: id } });

    dispatch(fetchProjects());
  };
}

export function editProject(element) {
  return async (dispatch) => {
    const Project = element;
    await axiosProjects.patch('', Project);
    await axiosProjectsUpdate.patch('', Project);
    dispatch(fetchProjects());
  };
}
