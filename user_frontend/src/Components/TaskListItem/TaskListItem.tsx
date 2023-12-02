import { Box, Checkbox, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Task } from "../../logic/interfaces.ts";
import { completeTask } from "../../logic/tasks.ts";
import { enqueueSnackbar } from "notistack";

interface Props {
    task: Task;
    getTasks: () => void;
}

const label = { inputProps: { 'aria-label': 'Zadanie ukończone' } };

export const TaskListItem = ({ task, getTasks }: Props) => {
    const handleComplete = async () => {
        const status = await completeTask(task.id);
        if (status === 200) {
            enqueueSnackbar("Status zadania został zmieniony pomyślnie!", { variant: "success" });
            getTasks();
        } else {
            enqueueSnackbar("Coś poszło nie tak", { variant: "error" });
        }
    };
    return (
        <Box sx={{ display: 'flex', my: .5, width: '100%' }}>
            <Checkbox {...label} style={{ color: "#4045c9" }} checked={task.isCompleted} onChange={handleComplete} />
            <Box>
                <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 'bold' }}>
                    {task.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6f6f6f' }}>
                    {task.date ? new Date(task.date).toLocaleDateString() : "Brak daty"}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <LocationOnOutlinedIcon sx={{ color: '#6f6f6f' }} />
            </Box>
        </Box>
    );
};