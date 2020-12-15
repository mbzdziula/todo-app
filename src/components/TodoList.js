import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox, Typography } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    'Frozen yoghnfdvnl  sdkfjds sdkhf sdf hdshf odsh fsdhf dshfisdf sfs urt',
    159,
    6.0,
    24,
    4.0,
  ),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TodoList() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell padding="checkbox">
                <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />
              </TableCell>
              <TableCell padding="none">
                <TableRow>
                  <Typography variant="body1">{row.name}</Typography>
                </TableRow>
                <TableRow>
                  <TableCell padding="none" style={{ border: 0 }}>
                    <Typography variant="caption" color="textSecondary">
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none" style={{ border: 0 }}>
                    <Typography variant="caption" color="textSecondary">
                      15.12.2020
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableCell>
              <TableCell padding="checkbox">
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />
              </TableCell>
              <TableCell padding="checkbox">
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TodoList;
