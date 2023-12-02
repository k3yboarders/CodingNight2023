import * as React from "react";
import { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "./../../../Layout/Copyright";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../logic/auth";

const ResetPassword = () => {
  const { resetId } = useParams<{ resetId: string }>();
  const navigate = useNavigate();
  const newPasswordRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();
  const confirmNewPasswordRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();

  const handleSubmit = async () => {
    if (
      newPasswordRef.current?.value === undefined ||
      confirmNewPasswordRef.current?.value === undefined ||
      newPasswordRef.current.value === "" ||
      confirmNewPasswordRef.current.value === ""
    ) {
      enqueueSnackbar("Powtórz hasło dwa razy!", { variant: "error" });
    } else if (
      newPasswordRef.current.value !== confirmNewPasswordRef.current.value
    ) {
      enqueueSnackbar("Hasła nie są identyczne!", { variant: "error" });
    } else {
      if (resetId) {
        const status = await resetPassword(
          resetId,
          newPasswordRef.current.value,
        );
        if (status === 201) {
          enqueueSnackbar("Hasło zostało zmienione", { variant: "success" });
          navigate("/auth/login");
        } else {
          enqueueSnackbar("Błąd serwera", { variant: "error" });
        }
      } else {
        navigate("/auth/login");
      }
    }
  };
  useEffect(() => {
    if (resetId === "") {
      navigate("/auth/login");
    }
  }, [resetId, navigate]);
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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zmień swoje hasło
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              inputRef={newPasswordRef}
              id="newPassword"
              label="Nowe hasło"
              type="password"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              inputRef={confirmNewPasswordRef}
              id="newPassword"
              label="Powtórz nowe hasło"
              type="password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Zmień hasło
            </Button>
            <Grid item sx={{ mt: 20 }}>
              <Copyright />
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
