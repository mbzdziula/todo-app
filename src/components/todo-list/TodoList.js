import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import ContainerTodo from './ContainerTodo';
import { likeTodo, doneTodo, fetchTodos, handleEdit } from '../../redux/actions/todoActions';
import { actionEditDrawer } from '../../redux/actions/drawerActions';
import { fetchProjects } from '../../redux/actions/projectActions';
import PropTypes from 'prop-types';

import CheckTodo from './CheckTodo';
import LikeTodo from './LikeTodo';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  done: {
    backgroundColor: theme.palette.grey[200],
    cursor: 'pointer',
  },
  row: {
    cursor: 'pointer',
    height: '20px',
  },
  icon: {
    margin: theme.spacing(20),
  },
}));

function TodoList(props) {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    props.fetchTodos();
    props.fetchProjects();
  }, []);

  const category = router.query.category;
  const showLike = props.todos.filter((element) => element.Like === 1);
  const showProject = props.todos.filter((element) => element.Project === router.query.project);

  const createRow = (array) => {
    return array.map((element, index) => (
      <TableRow hover key={index} className={element.IsDone ? classes.done : classes.row}>
        <TableCell padding="checkbox">
          <CheckTodo element={element} />
        </TableCell>
        <TableCell
          padding="none"
          onClick={() => {
            props.actionEditDrawer(true), props.handleEdit(element);
          }}
        >
          <ContainerTodo element={element} />
        </TableCell>
        <TableCell padding="checkbox">
          <LikeTodo element={element} />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {createRow(
              category === 'Skrzynka spraw'
                ? props.todos
                : category === 'Priorytety'
                ? showLike
                : showProject,
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  likeTodo: PropTypes.func.isRequired,
  doneTodo: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  actionEditDrawer: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: state.todoReducer.todos,
  };
}

const mapDispatchToProps = {
  likeTodo,
  doneTodo,
  fetchTodos,
  actionEditDrawer,
  handleEdit,
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
