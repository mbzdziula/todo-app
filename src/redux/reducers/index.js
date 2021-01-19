import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import todoReducer from './todoReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
  todoReducer,
  drawerReducer,
  projectReducer,
});

export default rootReducer;
