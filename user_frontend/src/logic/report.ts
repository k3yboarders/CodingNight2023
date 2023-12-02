import { backendRequest } from "./request";

export const addReport = async (data: any) => {
    const response = await backendRequest(`report`, "POST", true, data);
    return response.status;
}

export const getUserReports = async (isCompleted: boolean) => {
    const response = await backendRequest(`report/user?isCompleted=${isCompleted}`, "GET", true);
    return await response.json();
};

export const completeReport = async (id: number) => {
    const response = await backendRequest(`report/complete/${id}`, "GET", true);
    return response.status;
};