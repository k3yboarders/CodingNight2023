import { useState, useCallback, useEffect } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { getReports } from "../../logic/report";
import { Report as IReport } from "../../logic/interfaces";
import ReportstTable from "../../Components/Table/ReportsTable";

const Reports = () => {
    const [reports, setReports] = useState<IReport[]>([])
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const fetchData = useCallback(
        async (pageParam: number, isCompletedParam?: boolean) => {
            const res = await getReports(pageParam, isCompletedParam ? isCompletedParam : isCompleted);
            setTotalPages(res.totalPages);
            setTotalItems(res.totalItems);
            setPage(pageParam);
            setReports(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 100);
        },
        [],
    );

    useEffect(() => {
        setTotalPages(1);
        setPage(1);
        fetchData(1, isCompleted);
    }, [fetchData, isCompleted]);

    const handlePageChange = async (pageParam: number) => {
        setLoading(true);
        await fetchData(pageParam, isCompleted);
    };

    const handleIsCompletedChange = async () => {
        setLoading(true);
        setIsCompleted(!isCompleted);
        await fetchData(1, !isCompleted);
    };

    return (
        <>
            {loading ? (
                <LinearProgress />
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <Typography variant="h4">Zgłoszenia</Typography>
                    <Box sx={{ width: "40%" }}>
                        <Button variant="contained" onClick={handleIsCompletedChange}>{isCompleted ? "Wyświetl tylko nie rozwiązane" : "Wyświetl tylko rozwiązane"}</Button>
                    </Box>
                    <ReportstTable
                        reports={reports}
                        page={page}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        handlePageChange={handlePageChange}
                        fetchData={fetchData}
                    />
                </Box>

            )}
        </>
    );
};

export default Reports;