import React from 'react';
import Todo from './Todo';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import todoReducer from '../redux/reducers/todoReducer';

const store = createStore(todoReducer);

function App() {
  return (
    <ReduxProvider store={store}>
      <Todo />
    </ReduxProvider>
  );
}

export default App;
