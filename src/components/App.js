import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

function App(props) {
  return (
    <>
      <Todo user={props.user} />
    </>
  );
}

App.propTypes = {
  user: PropTypes.string,
};

export default App;
