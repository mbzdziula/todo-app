import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

function CheckTodo(props) {
  return props.IsDone ? (
    <IconButton
      aria-label="unCheck"
      disableFocusRipple
      disableRipple
      edge="end"
      onClick={() => props.doneTodo()}
    >
      <CheckCircleOutlineIcon fontSize="small" />
    </IconButton>
  ) : (
    <IconButton
      aria-label="check"
      disableFocusRipple
      disableRipple
      edge="end"
      onClick={() => props.doneTodo()}
    >
      <RadioButtonUncheckedIcon fontSize="small" />
    </IconButton>
  );
}

CheckTodo.propTypes = {
  IsDone: PropTypes.bool.isRequired,
  doneTodo: PropTypes.func.isRequired,
};

export default CheckTodo;
