import { backendRequest } from "./request";

export const addReport = async (data: any) => {
    const response = await backendRequest(`report`, "POST", true, data);
    return response.status;
}