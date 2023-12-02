import { useState, useCallback, useEffect } from "react";
import { Food as IFood } from "../../logic/interfaces";
import { LinearProgress, TextField, Box } from "@mui/material";
import { getFood } from "../../logic/food";
import FoodTable from "../../Components/Table/FoodTable";

const Food = () => {
    const [food, setFood] = useState<IFood[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(
        async (pageParam: number, searchParam?: string) => {
            const res = await getFood(pageParam, searchParam);
            setTotalPages(res.totalPages);
            setTotalItems(res.totalItems);
            setPage(pageParam);
            setFood(res.data);
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
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                />
            </Box>
            {loading ? (
                <LinearProgress />
            ) : (
                <FoodTable
                    food={food}
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

export default Food;