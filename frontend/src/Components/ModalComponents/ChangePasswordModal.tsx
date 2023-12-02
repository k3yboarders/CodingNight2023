import { Modal, Box, TextField, Typography, Grid } from "@mui/material";
import { formStyle, style } from "./modalStyles";
import { useRef } from "react";
import { enqueueSnackbar } from "notistack";
import { changePassword } from "../../logic/auth";
import ActionsButtons from "./ActionsButtons";
import EditIcon from "@mui/icons-material/Edit";

const ChangePasswordModal = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  const oldPasswordRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();
  const newPasswordRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();
  const newPasswordAgainRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();
  const handleSubmit = async () => {
    if (
      !oldPasswordRef.current ||
      !newPasswordRef.current ||
      !newPasswordAgainRef.current
    )
      return;
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const newPasswordAgain = newPasswordAgainRef.current.value;
    if (newPassword !== newPasswordAgain) {
      enqueueSnackbar("Hasła się nie zgadzają", { variant: "error" });
      return;
    }
    const status = await changePassword(oldPassword, newPassword);
    if (status === 200) {
      enqueueSnackbar("Hasło zostało zmienione", { variant: "success" });
      props.handleClose();
    } else {
      enqueueSnackbar("Zmiana hasła nie powiodła się", { variant: "error" });
    }
  };
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Grid container sx={formStyle}>
            <Grid item>
              <Typography variant="h4">Zmień hasło</Typography>
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                label="Stare hasło"
                autoComplete="password"
                autoFocus
                inputRef={oldPasswordRef}
                type="password"
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                label="Nowe hasło"
                autoComplete="new-password"
                autoFocus
                inputRef={newPasswordRef}
                type="password"
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                label="Powtórz nowe hasło"
                autoComplete="new-password"
                autoFocus
                inputRef={newPasswordAgainRef}
                type="password"
              />
            </Grid>
          </Grid>
          <ActionsButtons
            cancel={props.handleClose}
            submit={handleSubmit}
            submitText={"Zmień hasło"}
            submitIcon={<EditIcon />}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
