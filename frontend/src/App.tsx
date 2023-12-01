import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import Volunteers from "./Pages/Panel/Volunteers/Volunteers";
//import Layout from "./Layout/Layout";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import Map from "./Pages/Panel/Map/Map";

const router = createBrowserRouter([
  {
    path: "/panel/volunteers",
    element: <Volunteers/>
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