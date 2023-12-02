import {Report} from "../../logic/interfaces.ts";
import {Box} from "@mui/material";
import {ReportListItem} from "../ReportListItem/ReportListItem.tsx";

interface Props {
    reports: Report[];
    getReports: () => void;
}

export const ReportList = ({reports, getReports}: Props) => {
    return (
        <Box sx={{display: 'flex', p: 2, mt: 1, alignItems: 'flex-start', flexDirection: 'column'}}>
            {reports.length && reports.map((report) => (
                <ReportListItem report={report} key={report.id} getReports={getReports} />
            ))}
        </Box>
    );
};