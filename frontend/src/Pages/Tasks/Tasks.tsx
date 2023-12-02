import { useState, useCallback, useEffect } from "react";
import { Task } from "../../logic/interfaces";
import { LinearProgress, TextField, Box, Button } from "@mui/material";
import { getTasks } from "../../logic/tasks"
import TasksTable from "../../Components/Table/TasksTable";

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const fetchData = useCallback(
        async (pageParam: number, searchParam?: string, isCompletedParam = false) => {
            const res = await getTasks(pageParam, searchParam, isCompletedParam);
            setTotalPages(res.totalPages);
            setTotalItems(res.totalItems);
            setPage(pageParam);
            setTasks(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 100);
        },
        [],
    );

    useEffect(() => {
        setTotalPages(1);
        setPage(1);
        fetchData(1);
    }, [fetchData]);

    const handlePageChange = async (pageParam: number) => {
        setLoading(true);
        await fetchData(pageParam, search);
    };
    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        if (event.target.value === "") {
            fetchData(page);
            return;
        }
        setLoading(true);
        await fetchData(page, event.target.value);
    };

    const handleIsCompletedChange = async () => {
        setLoading(true);
        setIsCompleted(!isCompleted);
        await fetchData(1, search, !isCompleted);
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                <TextField
                    sx={{ width: "70%", mr: 2 }}
                    label="Wyszukaj"
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                />
                <Button sx={{width: "30%"}} variant="contained" onClick={handleIsCompletedChange}>{isCompleted ? "Wyświetl tylko do zrobienia" : "Wyświetl tylko zrobione"}</Button>

            </Box>
            {loading ? (
                <LinearProgress />
            ) : (
                <TasksTable
                    tasks={tasks}
                    page={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    handlePageChange={handlePageChange}
                    fetchData={fetchData}
                />
            )}
        </>
    );
};

export default Tasks;