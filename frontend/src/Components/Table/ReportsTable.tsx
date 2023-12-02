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
import PaginationFooter from "./Pagination/PaginationFooter";
import ReportsRow from "./Row/ReportsRow";
import { Report as IReport } from "../../logic/interfaces";

const ReportstTable = (props: {
    reports: IReport[];
    page: number;
    totalPages: number;
    totalItems: number;
    handlePageChange: (page: number) => void;
    fetchData: (pageParam: number, isCompletedParam?: boolean) => void;
}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Treść</TableCell>
                        <TableCell>Typ</TableCell>
                        <TableCell>Miejsce</TableCell>
                        <TableCell>Kierowca ambulansu</TableCell>
                        <TableCell>Rozwiązane</TableCell>
                        <TableCell>Działania</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.reports && props.reports.map((report: IReport) => (
                        <ReportsRow key={report.id} report={report} />
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

export default ReportstTable;