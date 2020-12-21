import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PropTypes from 'prop-types';
import EditMenu from './EditMenu';

function MoreIcon(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [elementHandler, setElementHandler] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleElement = (element) => {
    setElementHandler(element);
  };
  return (
    <>
      <IconButton
        aria-label="more"
        disableFocusRipple
        disableRipple
        edge="end"
        onMouseEnter={() => handleElement(props.element)}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <EditMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleEditTodo={props.handleEditTodo}
        elementHandler={elementHandler}
        deleteTodo={props.deleteTodo}
      />
    </>
  );
}

MoreIcon.propTypes = {
  element: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};

export default MoreIcon;
