import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckTodo from './CheckTodo';
import LikeTodo from './LikeTodo';
import ContainerTodo from './ContainerTodo';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { likeTodo, doneTodo, fetchTodos, actionEditDrawer } from '../../redux/actions/todoActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  done: {
    backgroundColor: theme.palette.grey[200],
  },
}));

function TodoList(props) {
  const classes = useStyles();

  useEffect(() => {
    props.fetchTodos();
  }, []);

  const createRow = (array) => {
    return array.map((element, index) => (
      <TableRow hover key={index} className={element.IsDone ? classes.done : ''}>
        <TableCell padding="checkbox">
          <CheckTodo element={element} />
        </TableCell>
        <TableCell padding="none" onClick={() => props.actionEditDrawer(true)}>
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
          <TableBody>{createRow(props.todos)}</TableBody>
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
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

const mapDispatchToProps = {
  likeTodo,
  doneTodo,
  fetchTodos,
  actionEditDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
