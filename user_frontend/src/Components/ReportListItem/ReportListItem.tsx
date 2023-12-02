import { Box, Checkbox, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Report } from "../../logic/interfaces.ts";
import { enqueueSnackbar } from "notistack";
import {completeReport} from "../../logic/report.ts";

interface Props {
    report: Report;
    getReports: () => void;
}

const label = { inputProps: { 'aria-label': 'Zadanie ukończone' } };

export const ReportListItem = ({ report, getReports }: Props) => {
    const handleComplete = async () => {
        const status = await completeReport(report.id);
        if (status === 200) {
            enqueueSnackbar("Status zadania został zmieniony pomyślnie!", { variant: "success" });
            getReports();
        } else {
            enqueueSnackbar("Coś poszło nie tak", { variant: "error" });
        }
    };
    return (
        <Box sx={{ display: 'flex', my: .5, width: '100%' }}>
            <Checkbox {...label} style={{ color: "#4045c9" }} checked={report.isCompleted} onChange={handleComplete} />
            <Box>
                <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 'bold' }}>
                    {report.text}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6f6f6f' }}>
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Brak daty"}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <LocationOnOutlinedIcon sx={{ color: '#6f6f6f' }} />
            </Box>
        </Box>
    );
};