import { useState, useCallback, useEffect } from "react";
import { Task } from "../../logic/interfaces";
import { LinearProgress, TextField, Box } from "@mui/material";
import { getTasks } from "../../logic/tasks"
import TasksTable from "../../Components/Table/TasksTable";

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(
        async (pageParam: number, searchParam?: string) => {
            const res = await getTasks(pageParam, searchParam);
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

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                <TextField
                    fullWidth
                    label="Wyszukaj"
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                />
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