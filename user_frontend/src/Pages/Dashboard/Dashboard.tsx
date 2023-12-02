import {AdminDashboard} from "./AdminDashboard/AdminDashboard.tsx";
import {DriverDashboard} from "./DriverDashboard/DriverDashboard.tsx";
import {VolunteerDashboard} from "./VolunteerDashboard/VolunteerDashboard.tsx";
import {getUserInfo} from "../../logic/auth.ts";
export const Dashboard = () => {
    const userInfo = getUserInfo();

    return (
        <>
            {userInfo.type === "DRIVER" && (
                <DriverDashboard />
            )}

            {userInfo.type === "VOLUNTEER" && (
                <VolunteerDashboard />
            )}

            {userInfo.type === "ADMIN" && (
                <AdminDashboard />
            )}
        </>
    );
};