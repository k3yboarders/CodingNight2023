import { backendRequest } from "./request"

export const getReports = async (page = 1, isCompleted: boolean, lastDays?: number) => {
    const response = await backendRequest(`report?page=${page}&isCompleted=${isCompleted}` + lastDays? `&lastDays=${lastDays}` : '', "GET", true);
    return await response.json();
};

export const getReportsByLastDays = async (lastDays: number) => {
    const response = await backendRequest(`report/last?days=${lastDays}`, "GET", true);
    return await response.json();
}

export const completeReport = async (id: number) => {
    const response = await backendRequest(`report/complete/${id}`, "GET", true);
    return response.status;
};

export const assignAmbulance = async (id: number, ambulanceId: number) => {
    const response = await backendRequest(`report/assign?reportId=${id}&ambulanceId=${ambulanceId}`, "GET", true);
    return response.status;
};

export const deleteReport = async (id: number) => {
    const response = await backendRequest(`report/${id}`, "DELETE", true);
    return await response.json();
};