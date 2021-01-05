import React from 'react';
import Todo from './Todo';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/store';

function App() {
  return (
    <ReduxProvider store={store}>
      <Todo />
    </ReduxProvider>
  );
}

export default App;
