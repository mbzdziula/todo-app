import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

import PropTypes from 'prop-types';

function LikeTodo(props) {
  return props.Like === 0 ? (
    <IconButton
      aria-label="unCheck"
      disableFocusRipple
      disableRipple
      edge="end"
      onClick={() => props.handleLikeTodo()}
    >
      <FavoriteBorderIcon fontSize="small" />
    </IconButton>
  ) : (
    <IconButton
      aria-label="check"
      disableFocusRipple
      disableRipple
      edge="end"
      color="primary"
      onClick={() => props.handleLikeTodo()}
    >
      <FavoriteIcon fontSize="small" />
    </IconButton>
  );
}

LikeTodo.propTypes = {
  Like: PropTypes.number.isRequired,
  handleLikeTodo: PropTypes.func.isRequired,
};

export default LikeTodo;
