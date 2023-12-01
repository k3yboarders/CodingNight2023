import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';

function createData(
  id: number,
  name: string,
  lastName: string,
  profession: string,
) {
  return {
    id,
    name,
    lastName,
    profession,
    tasks: [
      {
        id: '123',
        name: 'Pomoc uchodźcom',
        urgency: 3,
        longtitude: 12,
        latitude: 42
      },
      {
        id: '12',
        name: 'Dostarzeczenie opału',
        urgency: 1,
        longtitude: 13,
        latitude: 41
      },
    ],
  };
}

const rows = [
  createData(12, 'jarosław', 'stanostalny', 'kierowca'),
  createData(1, 'jarosławo', 'stanoslny', 'kierowca'),
  createData(13, 'jarosła', 'stanalny', 'kierowca'),
  createData(52, 'jarosł', 'statalny', 'kierowca'),
  createData(2, 'jaro', 'stanosny', 'kierowca'),
];

export default function Volunteers() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Imię</TableCell>
            <TableCell align="right">Nazwisko</TableCell>
            <TableCell align="right">Pozycja</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}