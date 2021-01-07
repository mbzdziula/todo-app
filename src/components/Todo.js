import { Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './todo-list/TodoList';
import { fetchTodos } from '../redux/actions/todoActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    marginTop: '5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async () => {
      await props.fetchTodos();
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return (
        <div className={classes.root}>
          <CircularProgress size="7rem" />
        </div>
      );
    }
  }, [loading]);

  return (
    <>
      <TodoForm />
      <Paper>
        <TodoList />
      </Paper>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

const mapDispatchToProps = {
  fetchTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
