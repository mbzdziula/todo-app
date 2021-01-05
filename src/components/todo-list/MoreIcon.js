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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        disableFocusRipple
        disableRipple
        edge="end"
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <EditMenu anchorEl={anchorEl} handleClose={handleClose} element={props.element} />
    </>
  );
}

MoreIcon.propTypes = {
  element: PropTypes.object.isRequired,
};

export default MoreIcon;
