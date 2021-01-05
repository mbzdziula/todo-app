import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { handleChange, newTodo, editTodo } from '../redux/actions/todoActions';

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

function TodoForm(props) {
  const classes = useStyles();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.selectionStart = inputRef.current.value.length;
    inputRef.current.selectionEnd = inputRef.current.value.length;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.todo || /^\s*$/.test(props.todo)) {
      return;
    }

    props.currentId === 0 ? props.newTodo(props.todo) : props.editTodo(props.currentId, props.todo);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Dodaj kolejne zadanie"
        onChange={props.handleChange}
        value={props.todo}
        inputRef={inputRef}
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
  );
}

TodoForm.propTypes = {
  newTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  todo: PropTypes.string.isRequired,
  currentId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    todo: state.currentTask.Todo,
    currentId: state.currentTask.Id,
  };
}

const mapDispatchToProps = {
  handleChange,
  newTodo,
  editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
