import { backendRequest } from "./request";

export const getUserTasks = async (isCompleted = false) => {
    const response = await backendRequest(`task/user?isCompleted=${isCompleted}`, "GET", true);
    return await response.json();
};

export const completeTask = async (taskId: number) => {
    const response = await backendRequest(`task/complete/${taskId}`, "GET", true);
    return response.status;
};
