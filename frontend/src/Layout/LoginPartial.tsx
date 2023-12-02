import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, logout } from "../logic/auth";

const LoginPartial = () => {
  const navigate = useNavigate();
  const user = getUserInfo();

  return (
    <>
      {user ? (
        <>
          <Typography>Witaj {user.username}</Typography>
          <IconButton
            color="inherit"
            onClick={(event) => {
              event.preventDefault();
              logout();
              navigate("/");
              window.location.reload();
            }}
          >
            <LogoutIcon fontSize="medium" />
          </IconButton>
        </>
      ) : (
        <IconButton color="inherit" component={Link} to={"/auth/login"}>
          <LoginIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
};

export default LoginPartial;