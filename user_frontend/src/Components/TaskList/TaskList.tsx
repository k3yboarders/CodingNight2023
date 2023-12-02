import {Task} from "../../logic/interfaces.ts";
import {Box} from "@mui/material";
import {TaskListItem} from "../TaskListItem/TaskListItem.tsx";

interface Props {
    tasks: Task[];
    getTasks: () => void;
}

export const TaskList = ({tasks, getTasks}: Props) => {
    return (
        <Box sx={{display: 'flex', p: 2, mt: 1, alignItems: 'flex-start', flexDirection: 'column'}}>
            {tasks.length && tasks.map((task) => (
                <TaskListItem task={task} key={task.id} getTasks={getTasks} />
            ))}
        </Box>
    );
};