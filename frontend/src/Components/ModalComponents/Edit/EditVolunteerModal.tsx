import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import { formStyle, style } from "../modalStyles";
import Volunteer from "../../../Pages/Panel/Volunteers/Volunteer";
import ActionsButtons from "../ActionsButtons";
import Edit from "@mui/icons-material/Edit";

const EditVolunteerModal = (props: {
  open: boolean;
  handleClose: () => void;
  volunteer: Volunteer;
  updateVolunteer: (volunteer: Volunteer) => void;
}) => {
  const handleEdit = async () => {
    //const response = await updateActivity(props.activity);
    //if (response.status === 200) {
    //  enqueueSnackbar("Activity updated!", { variant: "success" });
    //  props.handleClose();
    //} else {
    //  enqueueSnackbar("Something went wrong!", { variant: "error" });
    //  if (response.data.title) {
    //    response.data.title.forEach((error: string) => {
    //      enqueueSnackbar(`Title: ${error}`, { variant: "error" });
    //    });
    //  }
    //  if (response.data.description) {
    //    response.data.description.forEach((error: string) => {
    //      enqueueSnackbar(`Description: ${error}`, { variant: "error" });
    //    });
    //  }
    //  if (response.data.start_time) {
    //    response.data.start_time.forEach((error: string) => {
    //      enqueueSnackbar(`Start time: ${error}`, { variant: "error" });
    //    });
    //  }
    //  if (response.data.end_time) {
    //    response.data.end_time.forEach((error: string) => {
    //      enqueueSnackbar(`End time: ${error}`, { variant: "error" });
    //    });
    //  }
    //}
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Grid container sx={formStyle}>
          <Grid item>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit activity
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder={"Title"}
              value={props.volunteer.name}
              label="Imię"
              fullWidth
              onChange={(event) =>
                props.updateVolunteer({
                  ...props.volunteer,
                  name: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              placeholder={"Write description here..."}
              value={props.volunteer.lastName}
              label="Nazwisko"
              fullWidth
              onChange={(event) =>
                props.updateVolunteer({
                  ...props.volunteer,
                  lastName: event.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <ActionsButtons
          cancel={props.handleClose}
          submit={handleEdit}
          submitText={"Edit"}
          submitIcon={<Edit/>}
        />
      </Box>
    </Modal>
  );
};

export default EditVolunteerModal;