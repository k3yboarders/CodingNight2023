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
    path: "/panel/map",
    element: <Map />
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
          <RouterProvider router={router} />
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;