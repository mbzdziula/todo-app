import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import todoReducer from './reducers/todoReducer';

const store = createStore(todoReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;
