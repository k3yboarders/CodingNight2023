import { Typography, Container, Grid, Box, FormControl, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import StyledSelect from "../../Components/StyledSelect/StyledSelect.tsx";
import Map from "../../Components/Map/Map.tsx";
import { addReport } from "../../logic/report.ts";
import { useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";

const StyledContainer = styled(Container)(`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #fff;
  align-items: center;
`);

const StyledTextField = styled(TextField)(`
  background-color: #f2f2f2;
  border-radius: 1rem;
  border: none;
  padding: .5rem 1rem;
  width: 60%;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: #e5e5e5;
  }
`);

const StyledButton = styled(Button)(`
  background-color: #4045c9;
  color: #fff;
  border-radius: .5rem;
  border: none;
  padding: .5rem 1rem;
  width: 60%;
  max-width: 300px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  box-shadow: none;

  &:hover {
    box-shadow: none;
    background-color: #4045c9;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.1);
  }

`);

const currentDate = new Date();

const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

export const Report = () => {
    const textRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
        useRef();
    const [position, setPosition] = useState<any>();
    const [type, setType] = useState<string>("ROAD_ACCIDENT");
    const handleSubmit = async () => {
        if (!textRef.current?.value) {
            return;
        }
        const data = {
            text: textRef.current?.value,
            type: type,
            latitude: position.lat,
            longitude: position.lng
        }
        const status = await addReport(data);
        if (status === 201) {
            enqueueSnackbar("Zgłoszenie zostało wysłane!", { variant: "success" });
        } else {
            enqueueSnackbar("Coś poszło nie tak!", { variant: "error" });
        }
    };

    const updatePosition = (lat: number, lng: number) => {
        setPosition({ lat, lng });
    }
    return (
        <StyledContainer>
            <Typography variant="body1" align="center" sx={{ my: 1, fontWeight: 'bold' }}>Witaj użytkowniku!</Typography>
            <Grid container sx={{ display: 'flex', alignItems: 'center', px: 2, mt: 3, mb: 5 }}>
                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {daysOfWeek[currentDate.getDay()]}
                    </Typography>
                    <Typography variant="subtitle2">
                        {currentDate.toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" align="right" sx={{ fontWeight: 'bold' }}>
                        19:00
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ backgroundColor: '#fff', width: '100vw', borderRadius: '2rem 0 0 0', flex: 1 }}>
                <Typography variant="h5" align="center" sx={{ color: '#6f6f6f', mt: '2rem', fontWeight: 'bold' }}>
                    Zgłoś anonimowo zdarzenie
                </Typography>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#6f6f6f', my: 2 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>Opisz krótko zdarzenie</Typography>
                    <StyledTextField hiddenLabel variant="standard" InputProps={{ style: { color: "#6f6f6f" }, disableUnderline: true }}
                        placeholder="Prawdopoobnie pijany kierowca uderzył w drzewo." sx={{ width: { xs: '80%', lg: '60%' } }} inputRef={textRef}
                    />
                    <Typography variant="body1" sx={{ mb: 2, mt: 3 }}>Typ zdarzenia</Typography>
                    <StyledSelect value={type} onChange={(event) => {
                        setType(event.target.value);
                    }} />

                    <Typography variant="body1" sx={{ mb: 2, mt: 3 }}>Wybierz miejsce na mapie</Typography>
                    <Map updatePosition={updatePosition} />

                    <StyledButton variant="contained" sx={{ my: 5 }} onClick={handleSubmit}>Wyślij zgłoszenie</StyledButton>
                </FormControl>
            </Box>
        </StyledContainer>
    );
};