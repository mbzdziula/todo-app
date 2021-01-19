import React from 'react';
import { connect } from 'react-redux';
import {
  deleteTodo,
  handleChange,
  handleChangeComment,
  handleChangeDate,
  handleChangeProject,
  editTodo,
} from '../redux/actions/todoActions';
import { actionEditDrawer } from '../redux/actions/drawerActions';
import PropTypes from 'prop-types';

import 'date-fns';
import { pl } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
      marginTop: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
    width: '90%',
  },
}));

function EditDrawer(props) {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.currentTask.Todo || /^\s*$/.test(props.currentTask.Todo)) {
      return;
    }

    props.editTodo(props.currentTask), props.actionEditDrawer(false);
  };

  return (
    <div>
      <Drawer anchor="right" open={props.editDrawer} onClose={() => props.actionEditDrawer(false)}>
        <form noValidate autoComplete="off" className={classes.root}>
          <div>
            <TextField
              label="Zadanie"
              id="outlined-size-small"
              value={props.currentTask.Todo}
              onChange={props.handleChange}
              variant="outlined"
              size="small"
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
              <KeyboardDatePicker
                disableToolbar
                size="small"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data"
                value={props.currentTask.Date}
                onChange={props.handleChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <TextField
              id="outlined-select-currency"
              size="small"
              select
              label="Projekt"
              value={props.currentTask.Project}
              onChange={props.handleChangeProject}
              variant="outlined"
            >
              <MenuItem value="">Skrzynka spraw</MenuItem>
              {props.projects.map((element, index) => (
                <MenuItem key={index} value={element.Project}>
                  {element.Project}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              label="Komentarz"
              multiline
              rows={10}
              id="outlined-size-small"
              value={props.currentTask.Comment}
              onChange={props.handleChangeComment}
              variant="outlined"
              size="small"
            />
          </div>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Grid item xs={6}>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Zapisz
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  props.deleteTodo(props.currentTask.Id), props.actionEditDrawer(false);
                }}
              >
                Usuń
              </Button>
            </Grid>
          </Grid>
        </form>
      </Drawer>
    </div>
  );
}

EditDrawer.propTypes = {
  actionEditDrawer: PropTypes.func.isRequired,
  editDrawer: PropTypes.bool.isRequired,
  currentTask: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeComment: PropTypes.func.isRequired,
  handleChangeDate: PropTypes.func.isRequired,
  handleChangeProject: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    editDrawer: state.drawerReducer.editDrawer,
    currentTask: state.todoReducer.currentTask,
    projects: state.projectReducer.projects,
  };
}

const mapDispatchToProps = {
  actionEditDrawer,
  deleteTodo,
  handleChange,
  handleChangeComment,
  handleChangeDate,
  handleChangeProject,
  editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDrawer);
