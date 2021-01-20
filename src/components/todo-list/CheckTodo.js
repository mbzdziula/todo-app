import React from 'react';
import { connect } from 'react-redux';
import { doneTodo } from '../../redux/actions/todoActions';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: theme.spacing(1.3),
  },
}));

function CheckTodo(props) {
  const classes = useStyles();

  return props.element.IsDone ? (
    <IconButton
      className={classes.icon}
      aria-label="unCheck"
      disableFocusRipple
      disableRipple
      edge="end"
      size="small"
      onClick={() => props.doneTodo(props.element)}
    >
      <CheckCircleOutlineIcon />
    </IconButton>
  ) : (
    <IconButton
      className={classes.icon}
      aria-label="check"
      disableFocusRipple
      disableRipple
      edge="end"
      onClick={() => props.doneTodo(props.element)}
      size="small"
    >
      <RadioButtonUncheckedIcon />
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
