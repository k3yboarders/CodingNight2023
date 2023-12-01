import {
    Box,
    Typography,
    Modal,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from "@mui/material";
import { formStyle, style } from "../modalStyles";
import { enqueueSnackbar } from "notistack";
import { User, UserType } from "../../../logic/interfaces";
import ActionsButtons from "../ActionsButtons";
import EditIcon from "@mui/icons-material/Edit";
import { updateUser } from "../../../logic/users";

const EditUserModal = (props: {
    open: boolean;
    handleClose: () => void;
    user: User;
    updateUser: (user: User) => void;
}) => {

    const handleEdit = async () => {
        const response = await updateUser(props.user);
        if (response.status === 200) {
            enqueueSnackbar("User updated!", { variant: "success" });
            props.handleClose();
        } else {
            enqueueSnackbar("Something went wrong!", { variant: "error" });
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
                            placeholder={"Nazwa użytkownika"}
                            fullWidth
                            value={props.user.username}
                            onChange={(event) =>
                                props.updateUser({ ...props.user, username: event.target.value })
                            }
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            placeholder={"Email"}
                            fullWidth
                            value={props.user.email}
                            onChange={(event) =>
                                props.updateUser({ ...props.user, email: event.target.value })
                            }
                        />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="status">Rola</InputLabel>
                            <Select
                                labelId="status"
                                label="Rola"
                                required
                                value={props.user.type}
                                onChange={(event) =>
                                    props.updateUser({ ...props.user, type: event.target.value as UserType})
                                }
                            >
                                <MenuItem value={"ADMIN"}>Administrator</MenuItem>
                                <MenuItem value={"DRIVER"}>Kierowca karetki</MenuItem>
                                <MenuItem value={"VOLUNTEER"}>Wolontariusz</MenuItem>
                            </Select>
                        </FormControl>
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

export default EditUserModal;