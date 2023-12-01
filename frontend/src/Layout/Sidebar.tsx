import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard as DashboardIcon, People as PeopleIcon, Task as TaskIcon } from "@mui/icons-material/";

const Sidebar = () => {
  return (
    <List component="nav">
      <ListItemButton component={Link} to={"/"}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to={"/users"}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Użytkownicy" />
      </ListItemButton>
      <ListItemButton component={Link} to={"/tasks"}>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Zadania" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;