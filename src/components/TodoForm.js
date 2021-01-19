import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleChange, newTodo, editTodo } from '../redux/actions/todoActions';
import { actionMainDrawer } from '../redux/actions/drawerActions';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

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
  const router = useRouter();

  const initialTodo = { Todo: '', Like: 0, Project: '' };

  const [todo, setTodo] = useState(initialTodo);

  const handleChange = (event) => {
    const newTodo = event.target.value;
    const newLike = router.query.category === 'Priorytety' ? 1 : 0;
    const newProject = router.query.project !== 'main' ? router.query.project : '';
    setTodo({ ...todo, Todo: newTodo, Like: newLike, Project: newProject });
    console.log(todo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todo.Todo || /^\s*$/.test(todo.Todo)) {
      return;
    }

    props.newTodo(todo);
    setTodo(initialTodo);
  };

  return (
    <>
      <Paper elevation={0} component="form" className={classes.root} onSubmit={handleSubmit}>
        <IconButton
          className={props.mainDrawer ? classes.iconButtonNone : classes.iconButtonMainDrawer}
          aria-label="menu"
          onClick={() => props.actionMainDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Dodaj kolejne zadanie"
          onChange={handleChange}
          value={todo.Todo}
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
  actionMainDrawer: PropTypes.func.isRequired,
  mainDrawer: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    currentId: state.todoReducer.currentTask.Id,
    mainDrawer: state.drawerReducer.mainDrawer,
  };
}

const mapDispatchToProps = {
  handleChange,
  newTodo,
  editTodo,
  actionMainDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
