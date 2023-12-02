import {Typography, Container, Grid, Box} from "@mui/material";
import {styled} from "@mui/material/styles";
import {TaskList} from "../../../Components/TaskList/TaskList.tsx";

const StyledContainer = styled(Container)(`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #fff;
  align-items: center;
`);

const currentDate = new Date();

const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

const tasks = [
    {
        id: 1,
        time: new Date(),
        name: "Zadanie 1",
        urgency: 1,
        longitude: 0,
        latitude: 0,
    },
    {
        id: 2,
        time: new Date(),
        name: "Zadanie 1",
        urgency: 1,
        longitude: 0,
        latitude: 0,
    },
    {
        id: 3,
        time: new Date(),
        name: "Zadanie 1",
        urgency: 1,
        longitude: 0,
        latitude: 0,
    },
];

export const VolunteerDashboard = () => {
    return (
        <StyledContainer>
            <Typography variant="body1" align="center" sx={{my: 1, fontWeight: 'bold'}}>Witaj, Marcin</Typography>
            <Grid container sx={{display: 'flex', alignItems: 'center', px: 2, mt: 3, mb: 5}}>
                <Grid item xs={6}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {daysOfWeek[currentDate.getDay()]}
                    </Typography>
                    <Typography variant="subtitle2">
                        {currentDate.toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" align="right" sx={{fontWeight: 'bold'}}>
                        19:00
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{backgroundColor: '#fff', width: '100vw', borderRadius: '2rem 0 0 0', flex: 1}}>
                <Grid container sx={{px: 3, mt: '2rem'}}>
                    <Grid item xs={6}>
                        <Typography variant="body1" align="center" sx={{fontWeight: 'bold', backgroundColor: '#f2f2f2', color: '#6f6f6f', p: 2, borderRadius: 5, mr: 2}}>Zadania do wykonania</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" align="center" sx={{fontWeight: 'bold', backgroundColor: '#f2f2f2', color: '#6f6f6f', p: 2, borderRadius: 5, ml: 2}}>Zadania wykonane</Typography>
                    </Grid>
                </Grid>

                <TaskList tasks={tasks} />
            </Box>
        </StyledContainer>
    );
};