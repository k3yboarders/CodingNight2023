import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../../Layout/Copyright";
import { registerUser } from "../../../logic/auth";
import { enqueueSnackbar } from "notistack";
import { Link } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") && data.get("password") && data.get("username")) {
      const didRegisterSuccessfully = await registerUser(
        data.get("email"),
        data.get("username"),
        data.get("password"),
        data.get("firstName"),
        data.get("lastName"),
      );
      if (didRegisterSuccessfully) {
        enqueueSnackbar('Pomyślnie stworzono nowe konto!', { variant: "success" });
        navigate("/auth/login");
      } else {
        enqueueSnackbar("Coś poszło nie tak", { variant: "error" });
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/random/?city,night)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Zarejestruj się
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nazwa użytkownika"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adres email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Powtórz hasło"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                />
            <TextField
              margin="normal"
              fullWidth
              name="firstName"
              label="Imię"
              type="text"
              id="firstName"
            />
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label="Nazwisko"
              type="text"
              id="lastName"
            />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Zarejestruj się
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/auth/login"} component={RouterLink}>Masz już konto? Zaloguj się</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Grid item sx={{ mt: 10 }}>
          <Copyright />
        </Grid>
      </Container>
    </Grid>
  );
};

export default Register;
