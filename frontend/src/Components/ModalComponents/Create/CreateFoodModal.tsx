import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { formStyle, style } from "../modalStyles";
import { enqueueSnackbar } from "notistack";
import ActionsButtons from "../ActionsButtons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createFood } from "../../../logic/food";

const CreateFoodModal = (props: { open: boolean; handleClose: () => void }) => {
    const nameRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
        useRef();

    const quantityRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
        useRef();

    const unitRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
        useRef();

    const handleCreate = async () => {
        if (
            !nameRef.current ||
            !quantityRef.current ||
            !unitRef.current
        ) {
            enqueueSnackbar("Wypełnij wszystkie pola!", { variant: "error" });
            return;
        }
        const name = nameRef.current?.value;
        const quantity = quantityRef.current?.value;
        const unit = unitRef.current?.value;
        const status = await createFood(name, +quantity, unit);
        if (status === 201) {
            enqueueSnackbar("Pomyślnie dodano jedzenie!", { variant: "success" });
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
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Dodaj jedzenie
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Nazwa"} fullWidth inputRef={nameRef} />
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Ilość"} fullWidth inputRef={quantityRef} type="number" />
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Jednostka"} fullWidth inputRef={unitRef} />
                    </Grid>
                </Grid>
                <ActionsButtons
                    cancel={props.handleClose}
                    submit={handleCreate}
                    submitText={"Utwórz"}
                    submitIcon={<AddCircleIcon />}
                />
            </Box>
        </Modal>
    );
};

export default CreateFoodModal;