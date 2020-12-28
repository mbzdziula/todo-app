import React from 'react';
import Todo from './Todo';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, compose } from 'redux';
import todoReducer from '../redux/reducers/todoReducer';

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(todoReducer, composeEnhancers());

function App() {
  return (
    <ReduxProvider store={store}>
      <Todo />
    </ReduxProvider>
  );
}

export default App;
