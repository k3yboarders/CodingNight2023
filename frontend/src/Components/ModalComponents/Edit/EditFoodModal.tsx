import { Box, Typography, Modal, TextField, Grid } from "@mui/material";
import { formStyle, style } from "../modalStyles";
import { enqueueSnackbar } from "notistack";
import ActionsButtons from "../ActionsButtons";
import EditIcon from "@mui/icons-material/Edit";
import { updateFood } from "../../../logic/food";
import { Food } from "../../../logic/interfaces";

const EditFoodModal = (props: {
    open: boolean;
    handleClose: () => void;
    food: Food;
    updateFood: (food: Food) => void;
}) => {

    const handleEdit = async () => {
        const status = await updateFood(props.food);
        if (status === 200) {
            enqueueSnackbar("Jedzenie zaktualizowane!", { variant: "success" });
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
                            Edytuj dane użytkownika
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            placeholder={"Nazwa"}
                            fullWidth
                            value={props.food.name}
                            onChange={(event) => props.updateFood({ ...props.food, name: event.target.value })}
                        />
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Ilość"} fullWidth type="number" value={props.food.quantity} onChange={(event) => props.updateFood({ ...props.food, quantity: +event.target.value })} />
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Jednostka"} fullWidth value={props.food.unit} onChange={(event) => props.updateFood({ ...props.food, unit: event.target.value })} />
                    </Grid>
                </Grid>
                <ActionsButtons
                    cancel={props.handleClose}
                    submit={handleEdit}
                    submitText={"Edytuj"}
                    submitIcon={<EditIcon />}
                />
            </Box>
        </Modal>
    );
};

export default EditFoodModal;