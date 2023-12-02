import { Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { formStyle, style } from "../../modalStyles";
import { enqueueSnackbar } from "notistack";
import ActionsButtons from "../../ActionsButtons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createTask } from "../../../../logic/tasks";
import { backendRequest } from "../../../../logic/request";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface Volunteer {
    id: number,
    email: string,
    username: string
    firstName: string,
    lastName: string
}


const CreateTask = (props: { handleClose: () =>void, lat: number; lng:number }) => {
    const [volunteers, setVolunteers] = useState([] as Volunteer[]);
    const [volunteerId, setVolunteerId] = useState('');
    const [date, setDate] = useState(dayjs());

    useEffect(()=>{
        backendRequest('users?type=VOLUNTEER', 'GET', true).then((res)=>{
            if(res.ok)
                return res.json()
            throw new Error("Response wasn't ok")
        }).then((json)=> {
            setVolunteers(json.data);
            console.log(json.data)
        });
    }, [])


    const nameRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
        useRef();

    const urgencyRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
        useRef();


    const handleVolunteerChange = (event: SelectChangeEvent) =>{
        setVolunteerId(event.target.value)
    }

    const handleCreate = async () => {
        if (
            !nameRef.current ||
            !urgencyRef.current
            //!dateRef.current
        ) {
            enqueueSnackbar("Wypełnij wszystkie pola!", { variant: "error" });
            return;
        }
        const name = nameRef.current?.value;
        const urgency = urgencyRef.current?.value;
        //const date = dateRef.current?.value;
        const status = await createTask(name, +urgency, +volunteerId, date.toDate(), props.lat, props.lng);
        if (status) {
            enqueueSnackbar("Pomyślnie dodano zadanie!", { variant: "success" });
            props.handleClose();
        } else {
            enqueueSnackbar("Coś poszło nie tak!", { variant: "error" });
        }
    };
    return <>
                <Grid container sx={formStyle}>
                    <Grid item>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Dodaj nowe zadanie
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Zadanie"} fullWidth inputRef={nameRef} />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                        <InputLabel id="volunteer-selector-label">Wolontariusz</InputLabel>
                        <Select
                            labelId="volunteer-selector-label"
                            id="volunteer-selector"
                            value={volunteerId}
                            label="Wolontariusz"
                            onChange={handleVolunteerChange}
                        >
                            {volunteers.map(volunteer=> <MenuItem value={volunteer.id} key={volunteer.id}>{volunteer.firstName} {volunteer.lastName}</MenuItem>)}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField placeholder={"Priorytet"} fullWidth inputRef={urgencyRef} type="number"/>
                    </Grid>
                    <Grid item>
                        <DatePicker defaultValue={date} onChange={(newDate)=>{newDate && setDate(newDate)}} slotProps={{ textField: { fullWidth: true } }}/>
                    </Grid>
                    <ActionsButtons
                        cancel={props.handleClose}
                        submit={handleCreate}
                        submitText={"Utwórz"}
                        submitIcon={<AddCircleIcon />}
                    />
                </Grid>
                </>
    ;
};

export default CreateTask;