import { DangerType } from "./interfaces";
import { backendRequest } from "./request";

export const createDanger = async (
  dangerType: string,
  severity: number,
  lat: number,
  lng: number,
  radius?: number,
) => {
  let taskResponse;
  radius ?
  taskResponse = await backendRequest("dangerous-area", "POST", true, {
    dangerType,
    severity,
    latitude: lat,
    longitude: lng,
    radius
  })
  : taskResponse = await backendRequest('dangerous-place', "POST", true, {
    dangerType,
    severity,
    latitude: lat,
    longitude: lng,
  })

  return taskResponse.ok;
};

//export const getTasks = async (page = 1, search?: string) => {
//  const query = search ? `page=${page}&search=${search}` : `page=${page}`;
//  const response = await backendRequest(`/tasks?${query}`, "GET", true);
//  return await response.json();
//};
//
//export const updateTask = async (task: Task) => {
//  const response = await backendRequest(
//    `/tasks/${task.id}`,
//    "PATCH",
//    true,
//    task
//  );
//  return await response.json();
//};
//
//export const deleteTask = async (taskId: number) => {
//  const response = await backendRequest(`/tasks/${taskId}`, "DELETE", true);
//  return await response.json();
//};
//
//export const completeTask = async (taskId: number) => {
//  const response = await backendRequest(
//    `/tasks/complete/${taskId}`,
//    "GET",
//    true
//  );
//  return await response.json();
//};
//