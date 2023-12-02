import {Box, Container, Grid, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useCallback, useEffect, useState} from "react";
import {getUserInfo} from "../../../logic/auth.ts";
import {Report} from "../../../logic/interfaces.ts";
import {getUserReports} from "../../../logic/report.ts";
import {ReportList} from "../../../Components/ReportList/ReportList.tsx";

const StyledContainer = styled(Container)(`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #fff;
  align-items: center;
`);

const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

export const DriverDashboard = () => {
    const userInfo = getUserInfo();
    const [reports, setReports] = useState<Report[]>();
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    let time = new Date().toLocaleTimeString();

    const [ctime,setTime] = useState(time);
    const UpdateTime=()=>{
        time =  new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime)

    const getReports = useCallback(async () => {
        const response = await getUserReports(isCompleted);
        setReports(response);
    }, [isCompleted]);

    useEffect(() => {
        getReports();
    }, [getReports]);

    const handleChangeReportComplete = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <StyledContainer>
            <Typography variant="body1" align="center" sx={{ my: 1, fontWeight: 'bold' }}>Witaj, {userInfo.username}</Typography>
            <Grid container sx={{ display: 'flex', alignItems: 'center', px: 2, mt: 3, mb: 5 }}>
                <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {daysOfWeek[new Date().getDay()]}
                    </Typography>
                    <Typography variant="subtitle2">
                        {new Date().toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant="subtitle2" align="right">Aktualna godzina:</Typography>
                    <Typography variant="h6" align="right" sx={{ fontWeight: 'bold' }}>
                        {ctime}
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ backgroundColor: '#fff', width: '100vw', borderRadius: '2rem 0 0 0', flex: 1 }}>
                <Grid container sx={{ px: 3, mt: '2rem' }}>
                    <Grid item xs={6}>
                        <Typography variant="body1" align="center" sx={{ fontWeight: 'bold', backgroundColor: isCompleted ? '#f2f2f2' : '#4045c9', color: isCompleted ? '#6f6f6f' : '#fffff', p: 2, borderRadius: 5, mr: 2, cursor: "pointer" }} onClick={handleChangeReportComplete}>Wezwania do wykonania</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" align="center" sx={{ fontWeight: 'bold', backgroundColor: isCompleted ? '#4045c9' : '#f2f2f2', color: isCompleted ? '#fffff' : '#6f6f6f', p: 2, borderRadius: 5, ml: 2, cursor: "pointer" }} onClick={handleChangeReportComplete} >Wezwania wykonane</Typography>
                    </Grid>
                </Grid>

                {reports && reports.length > 0 && <ReportList reports={reports} getReports={getReports} />}
                {(!reports || reports.length === 0) && <Typography variant="body1">Brak wezwań</Typography>}
            </Box>
        </StyledContainer>
    );
};