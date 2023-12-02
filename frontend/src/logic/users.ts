import { User } from "./interfaces";
import { backendRequest } from "./request"

export const getAllUsers = async (page = 1, search?: string) => {
    const query = search ? `page=${page}&search=${search}` : `page=${page}`;
    const response = await backendRequest(`users?${query}`, "GET", true);
    return await response.json();
};

export const updateUser = async (data: User) => {
    const response = await backendRequest(`users/${data.id}`, "PUT", true, data);
    return await response.json();
};

export const deleteUser = async (id: number) => {
    const response = await backendRequest(`users/${id}`, "DELETE", true);
    return await response.json();
};