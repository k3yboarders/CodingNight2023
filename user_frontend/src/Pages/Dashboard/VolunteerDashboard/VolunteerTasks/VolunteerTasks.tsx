import {VolunteerUndoneTasks} from "./VolunteerUndoneTasks/VolunteerUndoneTasks.tsx";
import {VolunteerDoneTasks} from "./VolunteerDoneTasks/VolunteerDoneTasks.tsx";

export const VolunteerTasks = () => {
    return (
        <>
            <VolunteerUndoneTasks />
            <VolunteerDoneTasks />
        </>
    );
};