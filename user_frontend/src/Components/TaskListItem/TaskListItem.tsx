import {Box, Checkbox, Typography} from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {Task} from "../../logic/interfaces.ts";

interface Props {
    task: Task;
}

const label = { inputProps: { 'aria-label': 'Zadanie ukończone' } };

export const TaskListItem = ({task}: Props) => {
    return (
        <Box sx={{display: 'flex', my: .5, width: '100%'}}>
            <Checkbox {...label} style={{color: "#4045c9"}} />
            <Box>
                <Typography variant="body1" sx={{color: '#6f6f6f', fontWeight: 'bold'}}>
                    {task.name}
                </Typography>
                <Typography variant="body2" sx={{color: '#6f6f6f'}}>
                    {task.time.toLocaleDateString()}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', ml: 'auto'}}>
                <LocationOnOutlinedIcon sx={{color: '#6f6f6f'}} />
            </Box>
        </Box>
    );
};