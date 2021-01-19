import * as types from '../actions/actionTypes';
import { initialDrawer as initialState } from './initialState';

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACTION_EDIT_DRAWER:
      return actionEditDrawer(state, action.open);
    case types.ACTION_MAIN_DRAWER:
      return actionMainDrawer(state, action.open);
    default:
      return state;
  }
};

const actionMainDrawer = (state, open) => {
  return { ...state, mainDrawer: open };
};

const actionEditDrawer = (state, open) => {
  return { ...state, editDrawer: open };
};

export default drawerReducer;
