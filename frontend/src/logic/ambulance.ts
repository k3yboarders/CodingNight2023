import { backendRequest } from "./request";

export const getAllAvailableAmbulances = async () => {
    const response = await backendRequest(`ambulance/available`, "GET", true);
    return await response.json();
};
