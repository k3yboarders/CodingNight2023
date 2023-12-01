import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Volunteer from './Volunteer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Task from './Task';
import EditVolunteerModal from '../../../Components/ModalComponents/Edit/EditVolunteerModal';
import EditVolunteerTaskModal from '../../../Components/ModalComponents/Edit/EditVolunteerTaskModal';


export default function Row(props: { row: Volunteer }) {
  const [row, setRow] = React.useState(props.row);
  const [task, setTask] = React.useState({} as Task);
  const [open, setOpen] = React.useState(false);
  const [rowEdit, setRowEdit] = React.useState(false);
  const [taskEdit, setTaskEdit] = React.useState(false);

  return (
    <React.Fragment>
        <EditVolunteerModal
          open={rowEdit}
          handleClose={()=>setRowEdit(false)}
          volunteer={row}
          updateVolunteer={setRow}
        />
        <EditVolunteerTaskModal
          open={taskEdit}
          handleClose={()=>setTaskEdit(false)}
          task={task}
          updateTask={setTask}
        />
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.lastName}</TableCell>
        <TableCell align="right">{row.profession}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {setRowEdit(true)}}
          >
            <DriveFileRenameOutlineIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Zadania
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Zadanie</TableCell>
                    <TableCell>Priorytet</TableCell>
                    <TableCell align="right">Współrzędne</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tasks.map((taskRow: Task) => (
                    <TableRow key={taskRow.id}>
                      <TableCell component="th" scope="row">
                        {taskRow.name}
                      </TableCell>
                      <TableCell>
                        {taskRow.urgency}
                      </TableCell>
                      <TableCell align="right">
                        {taskRow.longtitude}-{taskRow.latitude} 
                      </TableCell>
                        <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {setTask(taskRow); setTaskEdit(true)}}
                        >
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}