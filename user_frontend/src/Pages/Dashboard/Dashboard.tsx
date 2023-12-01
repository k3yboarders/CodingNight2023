import {AdminDashboard} from "./AdminDashboard/AdminDashboard.tsx";
import {DriverDashboard} from "./DriverDashboard/DriverDashboard.tsx";
import {VolunteerDashboard} from "./VolunteerDashboard/VolunteerDashboard.tsx";

const userInfo = {
    type: "volunteer",
}
export const Dashboard = () => {
    return (
        <>
            {userInfo.type === "driver" && (
                <DriverDashboard />
            )}

            {userInfo.type === "volunteer" && (
                <VolunteerDashboard />
            )}

            {userInfo.type === "admin" && (
                <AdminDashboard />
            )}
        </>
    );
};