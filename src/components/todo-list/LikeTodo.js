import React from 'react';
import { connect } from 'react-redux';
import { likeTodo } from '../../redux/actions/todoActions';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: theme.spacing(1.3),
  },
}));

function LikeTodo(props) {
  const classes = useStyles();

  return props.element.Like === 0 ? (
    <IconButton
      className={classes.icon}
      aria-label="unCheck"
      disableFocusRipple
      disableRipple
      edge="end"
      size="small"
      onClick={() => props.likeTodo(props.element)}
    >
      <FavoriteBorderIcon />
    </IconButton>
  ) : (
    <IconButton
      className={classes.icon}
      aria-label="check"
      disableFocusRipple
      disableRipple
      edge="end"
      color="primary"
      size="small"
      onClick={() => props.likeTodo(props.element)}
    >
      <FavoriteIcon />
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
