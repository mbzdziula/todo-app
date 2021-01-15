import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleChange, newTodo, editTodo, mainDrawerOpen } from '../redux/actions/todoActions';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

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
  iconButtonMainDrawer: {
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  iconButtonNone: {
    display: 'none',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function TodoForm(props) {
  const classes = useStyles();

  const [todo, setTodo] = useState();

  const handleChange = (event) => {
    const newTodo = event.target.value;
    setTodo(newTodo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todo || /^\s*$/.test(todo)) {
      return;
    }

    props.newTodo(todo);
    setTodo('');
  };

  return (
    <>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <IconButton
          className={props.mainDrawer ? classes.iconButtonNone : classes.iconButtonMainDrawer}
          aria-label="menu"
          onClick={props.mainDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Dodaj kolejne zadanie"
          onChange={handleChange}
          value={todo}
        />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="add"
          onClick={handleSubmit}
        >
          <AddIcon />
        </IconButton>
      </Paper>
    </>
  );
}

TodoForm.propTypes = {
  newTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  todo: PropTypes.string.isRequired,
  currentId: PropTypes.number.isRequired,
  mainDrawerOpen: PropTypes.func.isRequired,
  mainDrawer: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    todo: state.currentTask.Todo,
    currentId: state.currentTask.Id,
    mainDrawer: state.mainDrawer,
  };
}

const mapDispatchToProps = {
  handleChange,
  newTodo,
  editTodo,
  mainDrawerOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
