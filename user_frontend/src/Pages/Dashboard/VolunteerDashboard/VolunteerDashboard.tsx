import {Typography, Container} from "@mui/material";
import {styled} from "@mui/material/styles";
import {VolunteerTasks} from "./VolunteerTasks/VolunteerTasks.tsx";

const StyledContainer = styled(Container)(`
  display: flex;
  flex-direction: column;
  background-color: #202b3b;
  min-height: 100vh;
  color: #fff;
  align-items: center;
  padding: 1rem;
`);

export const VolunteerDashboard = () => {
    return (
        <StyledContainer maxWidth={false}>
            <Typography variant="h4" align="center">Witaj, xyz</Typography>
            <VolunteerTasks />
        </StyledContainer>
    );
};