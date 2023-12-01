import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
} from "@mui/material";
import { Task } from "../../logic/interfaces";
import TaskRow from "./Row/TaskRow";
import PaginationFooter from "./Pagination/PaginationFooter";

const TasksTable = (props: {
    tasks: Task[];
    page: number;
    totalPages: number;
    totalItems: number;
    handlePageChange: (page: number) => void;
    fetchData: (pageParam: number, searchParam?: string) => void;
}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Zadanie</TableCell>
                        <TableCell>Priorytet</TableCell>
                        <TableCell>Zrobione</TableCell>
                        <TableCell>Działania</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tasks.map((task: Task) => (
                        <TaskRow
                            key={task.id}
                            task={task}
                        />
                    ))}
                </TableBody>
                {props.totalPages > 0 && (
                    <TableFooter>
                        <PaginationFooter
                            page={props.page}
                            totalPages={props.totalPages}
                            totalItems={props.totalItems}
                            handlePageChange={props.handlePageChange}
                        />
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    );
};

export default TasksTable;