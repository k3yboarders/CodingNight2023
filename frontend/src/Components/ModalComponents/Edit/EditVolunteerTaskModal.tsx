import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import { formStyle, style } from "../modalStyles";
import ActionsButtons from "../ActionsButtons";
import Edit from "@mui/icons-material/Edit";
import Task from "../../../Pages/Panel/Volunteers/Task";

const EditVolunteerTaskModal = (props: {
  open: boolean;
  handleClose: () => void;
  task: Task;
  updateTask: (task: Task) => void;
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
              value={props.task.name}
              label="Zadanie"
              fullWidth
              onChange={(event) =>
                props.updateTask({
                  ...props.task,
                  name: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              placeholder={"Write description here..."}
              value={props.task.urgency}
              label="Priorytet"
              fullWidth
              onChange={(event) =>
                props.updateTask({
                  ...props.task,
                  urgency: Number(event.target.value),
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              placeholder={"Write description here..."}
              value={props.task.longtitude}
              label="Szerokość"
              fullWidth
              onChange={(event) =>
                props.updateTask({
                  ...props.task,
                  longtitude: Number(event.target.value),
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              placeholder={"Write description here..."}
              value={props.task.latitude}
              label="Wysokość"
              fullWidth
              onChange={(event) =>
                props.updateTask({
                  ...props.task,
                  latitude: Number(event.target.value),
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


export default EditVolunteerTaskModal;