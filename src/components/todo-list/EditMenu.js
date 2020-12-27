import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as todoActions from '../../redux/actions/todoActions';
import { connect } from 'react-redux';

function EditMenu(props) {
  EditMenu.propTypes = {
    anchorEl: PropTypes.object,
    handleEditTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    elementHandler: PropTypes.object.isRequired,
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={props.handleClose}
      elevation={1}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem
        onClick={() => {
          props.handleClose();
          props.handleEditTodo(props.element);
        }}
      >
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="button">Edytuj</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.handleClose();
          props.deleteTodo(props.element.Id);
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="button">Usuń</Typography>
      </MenuItem>
    </Menu>
  );
}

function mapStateToProps(state) {
  return {
    todos: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTodo: (id) => dispatch(todoActions.deleteTodo(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMenu);
