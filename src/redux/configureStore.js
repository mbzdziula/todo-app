import { applyMiddleware, createStore, compose } from 'redux';
import todoReducer from './reducers/todoReducer';
import reduxImomutableStateInvariant from 'redux-immutable-state-invariant';
// import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    todoReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxImomutableStateInvariant())),
  );
}
