import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard as DashboardIcon, People as PeopleIcon, Task as TaskIcon, Public as PublicIcon } from "@mui/icons-material/";

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
      <ListItemButton component={Link} to={"/reports"}>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Zgłoszenia" />
      </ListItemButton>
        <ListItemButton component={Link} to={"/map"}>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Mapa" />
        </ListItemButton>
    </List>
  );
};

export default Sidebar;