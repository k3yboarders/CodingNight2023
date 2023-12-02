import {Container, Link, Typography} from "@mui/material";

export const AdminDashboard = () => {

    return (
        <Container component={Link} href="http://localhost:5174" maxWidth={false} sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            backgroundImage:
                "url(https://source.unsplash.com/random/?humanitarian,aid)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: 'pointer',
            textDecoration: 'none'
        }} >
            <Typography variant="h4" align="center"
                        sx={{fontWeight: 'bolder', textShadow: '0 0 10px black', color: '#fff'}}>
                Kliknij, aby przejść do panelu administratora
            </Typography>
        </Container>
    );
};