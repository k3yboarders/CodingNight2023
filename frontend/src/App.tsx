import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import Layout from "./Layout/Layout";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import Map from "./Pages/Panel/Map/Map";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import Tasks from "./Pages/Tasks/Tasks";
import Reports from "./Pages/Reports/Reports";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Food from "./Pages/Food/Food";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<Dashboard />} />,
  },
  {
    path: "/users",
    element: <Layout children={<Users />} />,
  },
  {
    path: "/tasks",
    element: <Layout children={<Tasks />} />,
  },
  {
    path: "/reports",
    element: <Layout children={<Reports />} />,
  },
  {
    path: "/panel/map",
    element: <Map />
  },
  {
    path: "/map",
    element: <Layout children={<Map />} containerless={true}/>
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/password/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/password/reset/:resetId",
    element: <ResetPassword />,
  },
  {
    path: "/food",
    element: <Layout children={<Food />} containerless={true}/>
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider>
        <ConfirmProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;