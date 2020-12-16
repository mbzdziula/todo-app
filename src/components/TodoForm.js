import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function TodoForm(props) {
  const classes = useStyles();

  TodoForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    todo: PropTypes.string.isRequired,
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={props.handleSubmit}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Dodaj kolejne zadanie"
        onChange={props.handleChange}
        value={props.todo}
      />
      <IconButton
        color="secondary"
        className={classes.iconButton}
        aria-label="add"
        onSubmit={props.handleSubmit}
      >
        <AddIcon />
      </IconButton>
    </Paper>
  );
}
