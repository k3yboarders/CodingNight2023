import {Typography, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Grid container sx={{height: '100vh'}}>
            <Grid item xs={12} lg={4} sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                backgroundImage:
                    "url(https://source.unsplash.com/random/?humanitarian)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: '#fff',
                cursor: 'pointer'
            }} onClick={() => navigate('/auth/login')}>
                <Typography variant="h4" align="center" sx={{fontWeight: 'bolder', textShadow: '0 0 10px black'}}>
                    Logowanie do panelu
                </Typography>
            </Grid>
            <Grid item xs={12} lg={4} sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                backgroundImage:
                    "url(https://source.unsplash.com/random/?humanitarian,aid)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: '#fff',
                cursor: 'pointer'
            }} onClick={() => navigate('/report')}>
                <Typography variant="h4" align="center" sx={{fontWeight: 'bolder', textShadow: '0 0 10px black'}}>
                    Anonimowe zgłoszenia
                </Typography>
            </Grid>
            <Grid item xs={12} lg={4} sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                backgroundImage:
                    "url(https://source.unsplash.com/random/?map)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: '#fff',
                cursor: 'pointer'
            }} onClick={() => navigate('/map')}>
                <Typography variant="h4" align="center" sx={{fontWeight: 'bolder', textShadow: '0 0 10px black'}}>
                    Mapa
                </Typography>
            </Grid>
        </Grid>
    );
};