import React from 'react';
import Todo from './Todo';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/store';
import { Container } from '@material-ui/core';

function App() {
  return (
    <ReduxProvider store={store}>
      <Container>
        <Todo />
      </Container>
    </ReduxProvider>
  );
}

export default App;
