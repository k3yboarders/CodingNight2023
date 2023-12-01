import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {

  return (
    <List component="nav">
      <ListItemButton component={Link} to={"/"}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

    </List>
  );
};

export default Sidebar;