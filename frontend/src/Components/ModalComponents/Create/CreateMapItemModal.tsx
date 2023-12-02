import { Box, Modal, SelectChangeEvent, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { style } from "../modalStyles";
import { enqueueSnackbar } from "notistack";
import { createTask } from "../../../logic/tasks";
import { backendRequest } from "../../../logic/request";
import dayjs from 'dayjs';
import CreateTask from "./CreateMapItemModal/CreateTask";
import CreateDanger from "./CreateMapItemModal/CreateDanger";

interface Volunteer {
    id: number,
    email: string,
    username: string
    firstName: string,
    lastName: string
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`modal-tabpanel-${index}`}
      aria-labelledby={`modal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `modal-tab-${index}`,
    'aria-controls': `modal-tabpanel-${index}`,
  };
}


const CreateMapItemModal = (props: { open: boolean; handleClose: () => void; lat: number; lng:number }) => {
    const [volunteers, setVolunteers] = useState([] as Volunteer[]);
    const [volunteerId, setVolunteerId] = useState('');
    const [tab, setTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={style}>
                <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Zadanie" {...a11yProps(0)} />
                    <Tab label="Zagrożenie" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                    <CreateTask lat={props.lat} lng={props.lng} handleClose={props.handleClose}/> 
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <CreateDanger lat={props.lat} lng={props.lng} handleClose={props.handleClose}/> 
                </TabPanel>
                </Box>

            </Box>
        </Modal>
    );
};

export default CreateMapItemModal;