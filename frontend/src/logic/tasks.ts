import { Task } from "./interfaces";
import { backendRequest } from "./request";

export const createTask = async (
  name: string,
  urgency: number,
  volunteerId: number,
  date: Date,
  lat: number,
  lng: number
) => {
  const taskResponse = await backendRequest("task", "POST", true, {
    name,
    urgency,
    date,
    latitude: lat,
    longitude: lng,
  });

  if (taskResponse.ok) {
    const json = await taskResponse.json();
    const taskId = json;

    const assignResponse = await backendRequest(`task/assign`, "POST", true, {
      taskId,
      userId: volunteerId,
    });

    return assignResponse.ok;
  }

  return taskResponse.ok;
};

export const getTasks = async (page = 1, search?: string, isCompleted = false) => {
  let query = search ? `page=${page}&search=${search}` : `page=${page}`;
  if (isCompleted) {
    query += `&isCompleted=${isCompleted}`;
  }
  const response = await backendRequest(`task?${query}`, "GET", true);
  return await response.json();
};

export const updateTask = async (task: Task) => {
  const response = await backendRequest(
    `/tasks/${task.id}`,
    "PATCH",
    true,
    task
  );
  return await response.json();
};

export const deleteTask = async (taskId: number) => {
  const response = await backendRequest(`task/${taskId}`, "DELETE", true);
  return await response.json();
};

export const completeTask = async (taskId: number) => {
  const response = await backendRequest(`task/complete/${taskId}`, "GET", true);
  return await response.json();
};
