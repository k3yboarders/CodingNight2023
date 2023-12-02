import { Typography, Container, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TaskList } from "../../../Components/TaskList/TaskList.tsx";
import { Task } from "../../../logic/interfaces.ts";
import { useCallback, useEffect, useState } from "react";
import { getUserTasks } from "../../../logic/tasks.ts";
import { getUserInfo } from "../../../logic/auth.ts";

const StyledContainer = styled(Container)(`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #fff;
  align-items: center;
`);

const currentDate = new Date();

const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

export const VolunteerDashboard = () => {
    const userInfo = getUserInfo();
    const [tasks, setTasks] = useState<Task[]>();
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const getTasks = useCallback(async () => {
        const response = await getUserTasks(isCompleted);
        setTasks(response);
    }, [isCompleted]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);


    const handleChangeTaskComplete = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <StyledContainer>
            <Typography variant="body1" align="center" sx={{ my: 1, fontWeight: 'bold' }}>Witaj, {userInfo.username}</Typography>
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
                <Grid container sx={{ px: 3, mt: '2rem' }}>
                    <Grid item xs={6}>
                        <Typography variant="body1" align="center" sx={{ fontWeight: 'bold', backgroundColor: isCompleted ? '#f2f2f2' : '#4045c9', color: isCompleted ? '#6f6f6f' : '#fffff', p: 2, borderRadius: 5, mr: 2, cursor: "pointer" }} onClick={handleChangeTaskComplete}>Zadania do wykonania</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" align="center" sx={{ fontWeight: 'bold', backgroundColor: isCompleted ? '#4045c9' : '#f2f2f2', color: isCompleted ? '#fffff' : '#6f6f6f', p: 2, borderRadius: 5, ml: 2, cursor: "pointer" }} onClick={handleChangeTaskComplete} >Zadania wykonane</Typography>
                    </Grid>
                </Grid>

                {tasks && tasks.length > 0 && <TaskList tasks={tasks} />}
            </Box>
        </StyledContainer>
    );
};