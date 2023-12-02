import { useState } from "react";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import { Report } from "../../../logic/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import CompleteIcon from "@mui/icons-material/CheckCircle";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";
import { completeReport, deleteReport } from "../../../logic/report";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { dangerTypePrettyName } from "../../../logic/utils";
import AssignAmbulanceToReportModal from "../../ModalComponents/AssignAmbulanceToReportModal";

const ReportsRow = (props: {
    report: Report;
}) => {
    const confirm = useConfirm();
    const [hide, setHide] = useState(false);
    const [openAssignAmbulanceModal, setOpenAssignAmbulanceModal] = useState(false);
    const [editedReport] = useState<Report>(props.report);

    const handleDelete = async () => {
        confirm({ description: "Czy na pewno chcesz usunąć raport?" })
            .then(async () => {
                const status = await deleteReport(editedReport.id);
                if (status === 204) {
                    enqueueSnackbar("Raport usunięty!", { variant: "success" });
                    setHide(true);
                } else {
                    enqueueSnackbar("Usuwanie raportu nie powiodło się", { variant: "error" });
                }
            })
            .catch(() => {
                enqueueSnackbar("Raport nie został usunięty!", { variant: "info" });
            });
    };

    const hanldleComplete = async () => {
        const status = await completeReport(editedReport.id);
        if (status === 200) {
            enqueueSnackbar("Status został pomyślnie zmieniony!", { variant: "success" });
            setHide(true);
        } else {
            enqueueSnackbar("Coś poszło nie tak!", { variant: "error" });
        }
    }

    console.log(editedReport);
    return (
        <>
            {!hide && (
                <TableRow
                    key={editedReport.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell>
                        {editedReport.text}
                    </TableCell>
                    <TableCell>
                        {dangerTypePrettyName(editedReport.type)}
                    </TableCell>
                    <TableCell>
                        Mapa
                    </TableCell>
                    <TableCell>
                        {editedReport.ambulance ? (editedReport.ambulance.driver?.firstName + " " + editedReport.ambulance.driver?.lastName) : "Brak"}
                    </TableCell>
                    <TableCell>
                        {editedReport.isCompleted ? "Tak" : "Nie"}
                    </TableCell>
                    <TableCell>
                        <Tooltip title="Oznacz jako rozwiązany">
                            <IconButton onClick={hanldleComplete}>
                                <CompleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Przypisz ambulans">
                            <IconButton onClick={() => setOpenAssignAmbulanceModal(true)}>
                                <LocalHospitalIcon />
                            </IconButton>
                        </Tooltip>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )}
            {openAssignAmbulanceModal && (
                <AssignAmbulanceToReportModal
                    open={openAssignAmbulanceModal}
                    handleClose={() => setOpenAssignAmbulanceModal(false)}
                    report={editedReport}
                />
            )}
        </>
    );
};

export default ReportsRow;