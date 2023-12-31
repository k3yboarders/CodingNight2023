import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import {Home} from "./Pages/ Home/Home.tsx";
import {Dashboard} from "./Pages/Dashboard/Dashboard.tsx";
import {Report} from "./Pages/Report/Report.tsx";
import Map from "./Pages/Map/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/map",
    element: <Map />,
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
          <RouterProvider router={router} />
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;