import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  task: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

function ContainerTodo(props) {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      color={props.IsDone ? 'textSecondary' : 'textPrimary'}
      className={classes.task}
    >
      {props.Todo}
    </Typography>
  );
}

ContainerTodo.propTypes = {
  IsDone: PropTypes.bool.isRequired,
  Todo: PropTypes.string.isRequired,
};

export default ContainerTodo;
