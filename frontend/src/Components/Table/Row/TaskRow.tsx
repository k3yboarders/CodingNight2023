import { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Task } from "../../../logic/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { deleteTask, updateTask } from "../../../logic/tasks";
//import EditTaskModal from "../../ModalComponents/Edit/EditTaskModal";

const TaskRow = (props: {
    task: Task;
}) => {
    const confirm = useConfirm();
    const [hide, setHide] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editedTask, setEditedTask] = useState<Task>(props.task);

    const handleDelete = async () => {
        if (props.task === null) return;
        confirm({ description: "Czy na pewno chcesz usunąć to zadanie?" })
            .then(async () => {
                const status = await deleteTask(props.task.id.toString());
                if (status === 204) {
                    enqueueSnackbar("Zadanie usunięte!", { variant: "success" });
                    setHide(true);
                } else {
                    enqueueSnackbar("Coś poszło nie tak!", { variant: "error" });
                }
            })
            .catch(() => {
                enqueueSnackbar("Zadanie nie zostało usunięte!", { variant: "info" });
            });
    };
    const editTask = (task: Task) => {
        setEditedTask(task);
    };
    const handleComplete = async () => {
        const task = { ...editedTask, status: "DONE", completed_at: new Date() };
        setEditedTask(task);
        const response = await updateTask(task);
        if (response.status === 200) {
            enqueueSnackbar("Zadanie zostało oznaczone jako wykonane!", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("Coś poszło nie tak!", { variant: "error" });
        }
    };

    const handleCloseEditModal = () => {
        setEdit(false);
    };

    return (
        <>
            {!hide && (
                <TableRow
                    key={editedTask.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >

                    <TableCell>{editedTask.name}</TableCell>
                    <TableCell>{editedTask.urgency}</TableCell>
                    <TableCell>{editedTask.isCompleted ? "Zrobione" : "Do zrobienia"}</TableCell>
                    <TableCell>
                        <IconButton onClick={handleComplete}>
                            <CheckCircleIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default TaskRow;