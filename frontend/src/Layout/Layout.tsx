import { ReactElement, useEffect, useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
} from "@mui/material";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import LoginPartial from "./LoginPartial";
import { isUserLoggedIn } from "../logic/auth";
import Copyright from "./Copyright";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.svg";

const Layout = (props: { children: ReactElement, containerless?: boolean, noCopyright?: boolean }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const userLoggedIn = isUserLoggedIn();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/auth/login");
    }
  }, [userLoggedIn, navigate]);

  const toggleDrawer = () => {
    setOpen(!open);
  };



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <LoginPartial />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <Typography variant="h6" noWrap component="div" sx={{display: 'flex', alignItems: 'center'}}>
            <img src={logo} alt="Logo" style={{height: 50}} />
            Haid
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Sidebar />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {props.containerless ? 
          props.children :
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {props.children}
        </Container>
        }
        {!props.noCopyright && <Copyright />}
      </Box>
    </Box>
  );
};

export default Layout;