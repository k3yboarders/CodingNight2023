import { useState, useCallback, useEffect } from "react";
import { LinearProgress, TextField, Box } from "@mui/material";
import { User } from "../../logic/interfaces";
import { getAllUsers } from "../../logic/users";
import UsersTable from "../../Components/Table/UsersTable";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(
        async (pageParam: number, searchParam?: string) => {
            const res = await getAllUsers(pageParam, searchParam);
            setTotalPages(res.totalPages);
            setTotalItems(res.totalItems);
            setPage(pageParam);
            setUsers(res.data);
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
                <UsersTable
                    users={users}
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

export default Users;