import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { doneTodo } from '../../redux/actions/todoActions';
import { connect } from 'react-redux';

function CheckTodo(props) {
  return props.element.IsDone ? (
    <IconButton
      aria-label="unCheck"
      disableFocusRipple
      disableRipple
      edge="end"
      onClick={() => props.doneTodo(props.element)}
    >
      <CheckCircleOutlineIcon fontSize="small" />
    </IconButton>
  ) : (
    <IconButton
      aria-label="check"
      disableFocusRipple
      disableRipple
      edge="end"
      onClick={() => props.doneTodo(props.element)}
    >
      <RadioButtonUncheckedIcon fontSize="small" />
    </IconButton>
  );
}

CheckTodo.propTypes = {
  element: PropTypes.object.isRequired,
  doneTodo: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  doneTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckTodo);
