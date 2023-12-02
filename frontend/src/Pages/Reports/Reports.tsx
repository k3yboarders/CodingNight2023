import { useState, useCallback, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { getReports } from "../../logic/report";
import { Report as IReport } from "../../logic/interfaces";
import ReportstTable from "../../Components/Table/ReportsTable";

const Reports = () => {
    const [reports, setReports] = useState<IReport[]>([])
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(
        async (pageParam: number) => {
            const res = await getReports(pageParam);
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
        fetchData(1);
    }, [fetchData]);

    const handlePageChange = async (pageParam: number) => {
        setLoading(true);
        await fetchData(pageParam);
    };

    return (
        <>
            {loading ? (
                <LinearProgress />
            ) : (
                <ReportstTable
                    reports={reports}
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

export default Reports;