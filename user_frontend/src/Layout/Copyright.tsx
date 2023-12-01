import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Copyright = () => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        <Link component={RouterLink} to={"/"} rel="noopener noreferrer">
          CodingNight2023
        </Link>
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        Made with{" "}
        <FavoriteIcon sx={{ color: "red", verticalAlign: "middle" }} /> by{" "}
        <Link
          href="https://github.com/k3yboarders"
          target="_blank"
          rel="noopener noreferrer"
        >
         k3yboarders
        </Link>
      </Typography>
      <Typography align="center">
        <IconButton
          aria-label="GitHubIcon"
          href="https://github.com/k3yboarders/CodingNight2023"
          target="_blank"
        >
          <GitHubIcon sx={{ color: "#000" }} fontSize="large" />
        </IconButton>
      </Typography>
    </>
  );
};

export default Copyright;