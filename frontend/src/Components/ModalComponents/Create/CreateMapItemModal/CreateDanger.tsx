import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { formStyle, style } from "../../modalStyles";
import { enqueueSnackbar } from "notistack";
import ActionsButtons from "../../ActionsButtons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createTask } from "../../../../logic/tasks";
import { backendRequest } from "../../../../logic/request";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import getDangerTypeParams, { DangerType } from "../../../../Pages/Panel/Map/DangerType";
import { createDanger } from "../../../../logic/dangers";

interface Volunteer {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

const CreateTask = (props: {
  handleClose: () => void;
  lat: number;
  lng: number;
}) => {
  const [volunteers, setVolunteers] = useState([] as Volunteer[]);
  const [dangerType, setDangerType] = useState(DangerType.UNKNOWN);
  const dangerTypes = [] as string[]
  const [dangerRadiusEnabled, setDangerRadiusEnabled] = useState(false)

  for (let item in DangerType) {
    if (isNaN(Number(item))) {
        dangerTypes.push(item);
    }
  }

  useEffect(() => {
    backendRequest("users?type=VOLUNTEER", "GET", true)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Response wasn't ok");
      })
      .then((json) => {
        setVolunteers(json.data);
        console.log(json.data);
      });
  }, []);


  const severityRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();

  const radiusRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();

  const handleDangerTypeChange = (event: SelectChangeEvent) => {
    let realType: DangerType = DangerType[event.target.value as keyof typeof DangerType];
    setDangerType(realType);
  };

  const handleCreate = async () => {
    if (
      !severityRef.current ||
      !radiusRef.current
    ) {
      enqueueSnackbar("Wypełnij wszystkie pola!", { variant: "error" });
      return;
    }
    const radius = radiusRef.current?.value;
    const severity = severityRef.current?.value;
    const status = await createDanger(
      DangerType[dangerType],
      Number(severity),
      props.lat,
      props.lng,
      dangerRadiusEnabled ? Number(radius) : undefined,
    );
    if (status) {
      enqueueSnackbar("Pomyślnie dodano jedzenie!", { variant: "success" });
      props.handleClose();
    } else {
      enqueueSnackbar("Coś poszło nie tak!", { variant: "error" });
    }
  };
  return (
    <>
      <Grid container sx={formStyle}>
        <Grid item>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Dodaj nowe zagrożenie
          </Typography>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="danger-selector-label">Typ zagrożenia</InputLabel>
            <Select
              labelId="danger-selector-label"
              id="danger-selector"
              value={DangerType[dangerType]}
              placeholder="Typ zagrożenia"
              onChange={handleDangerTypeChange}
            >
              {dangerTypes.map((dangerType) => (
                <MenuItem value={dangerType} key={dangerType}>
                  {getDangerTypeParams(dangerType).name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            placeholder={"Stopień zagrożenia"}
            fullWidth
            inputRef={severityRef}
            type="number"
          />
        </Grid>
        <Grid item>
            <FormControlLabel control={<Checkbox value={dangerRadiusEnabled} onChange={()=>setDangerRadiusEnabled(!dangerRadiusEnabled)}/>} label="Obejmuje większy obszar" />
        </Grid>
        <Grid item>
          <TextField
            placeholder={"Promień zagrożenia (w metrach)"}
            fullWidth
            inputRef={radiusRef}
            type="number"
            disabled={!dangerRadiusEnabled}
          />
        </Grid>
        <ActionsButtons
          cancel={props.handleClose}
          submit={handleCreate}
          submitText={"Utwórz"}
          submitIcon={<AddCircleIcon />}
        />
      </Grid>
    </>
  );
};

export default CreateTask;
