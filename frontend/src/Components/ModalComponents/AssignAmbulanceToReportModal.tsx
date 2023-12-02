import { Modal, Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ActionsButtons from "./ActionsButtons";
import { style, formStyle } from "./modalStyles";
import { useEffect, useState } from "react";
import { Ambulance, Report } from "../../logic/interfaces";
import { getAllAvailableAmbulances } from "../../logic/ambulance";
import PlusIcon from "@mui/icons-material/Add";
import { assignAmbulance } from "../../logic/report";
import { enqueueSnackbar } from "notistack";

const AssignAmbulanceToReportModal = (props: {
    open: boolean;
    handleClose: () => void;
    report: Report;
}) => {
    const [availableAmbulances, setAvailableDrivers] = useState<Ambulance[]>([]);
    const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance>();

    useEffect(() => {
        const fetchAvailableDrivers = async () => {
            const res = await getAllAvailableAmbulances();
            setAvailableDrivers(res);
        };
        fetchAvailableDrivers();
    }, []);

    const handleSubmit = async () => {
        if (!selectedAmbulance) return;
        const status = await assignAmbulance(props.report.id, selectedAmbulance?.id);
        if (status === 200) {
            enqueueSnackbar("Ambulans przypisany!", { variant: "success" });
            props.handleClose();
        } else {
            enqueueSnackbar("Coś poszło nie tak!", { variant: "error" });
        }
    };

    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={style}>
                <Grid container sx={formStyle}>
                    <Grid item>
                        <Typography variant="h6">Przypisz ambulans do tego zdarzenia</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="status">Ambulans</InputLabel>
                            <Select
                                labelId="status"
                                label="Ambulans"
                                required
                                value={selectedAmbulance?.id}
                                onChange={(event) =>
                                    setSelectedAmbulance(availableAmbulances.find((ambulance) => ambulance.id === event.target.value))
                                }
                            >
                                {availableAmbulances.map((ambulance) => (
                                    <MenuItem key={ambulance.id} value={ambulance.id}>
                                        {ambulance.driver?.firstName} {ambulance.driver?.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <ActionsButtons
                    cancel={props.handleClose}
                    submit={handleSubmit}
                    submitText={"Przypisz"}
                    submitIcon={<PlusIcon />}
                />
            </Box>
        </Modal>
    );
};

export default AssignAmbulanceToReportModal;