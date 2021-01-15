import React from 'react';
import { connect } from 'react-redux';
import { likeTodo } from '../../redux/actions/todoActions';
import PropTypes from 'prop-types';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

function LikeTodo(props) {
  return props.element.Like === 0 ? (
    <IconButton
      aria-label="unCheck"
      disableFocusRipple
      disableRipple
      edge="end"
      onClick={() => props.likeTodo(props.element)}
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
      onClick={() => props.likeTodo(props.element)}
    >
      <FavoriteIcon fontSize="small" />
    </IconButton>
  );
}

LikeTodo.propTypes = {
  element: PropTypes.object.isRequired,
  likeTodo: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  likeTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeTodo);
