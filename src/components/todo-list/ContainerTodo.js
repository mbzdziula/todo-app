import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  info: {
    marginRight: theme.spacing(2),
  },
  icon: {
    display: 'block',
    width: 15,
    marginRight: 4,
  },
  hide: {
    display: 'none',
  },
}));

function ContainerTodo(props) {
  const classes = useStyles();
  const newDate = new Date(Date.parse(props.element.Date));
  const date = newDate.getDate() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getFullYear();

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs="12">
          <Typography
            variant="body1"
            color={props.element.IsDone ? 'textSecondary' : 'textPrimary'}
            onClick={props.onClick}
          >
            {props.element.Todo}
          </Typography>
        </Grid>
        <Grid item className={props.element.Date !== null ? '' : classes.hide}>
          <CalendarTodayIcon fontSize="small" color="action" className={classes.icon} />
        </Grid>
        <Grid item className={props.element.Date !== null ? '' : classes.hide}>
          <Typography
            variant="caption"
            color="textSecondary"
            onClick={props.onClick}
            className={classes.info}
          >
            {date}
          </Typography>
        </Grid>
        <Grid item className={props.element.Project !== '' ? '' : classes.hide}>
          <WorkOutlineIcon fontSize="small" color="action" className={classes.icon} />
        </Grid>
        <Grid item className={props.element.Project !== '' ? '' : classes.hide}>
          <Typography
            variant="caption"
            color="textSecondary"
            onClick={props.onClick}
            className={classes.info}
          >
            {props.element.Project}
          </Typography>
        </Grid>
        <Grid item className={props.element.Comment !== '' ? '' : classes.hide}>
          <ChatBubbleOutlineIcon fontSize="small" color="action" className={classes.icon} />
        </Grid>
      </Grid>
    </div>
  );
}

ContainerTodo.propTypes = {
  element: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContainerTodo;
