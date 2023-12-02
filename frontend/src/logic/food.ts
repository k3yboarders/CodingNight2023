import { Food } from "./interfaces";
import { backendRequest } from "./request";

export const getFood = async (page = 1, search?: string) => {
  const query = search ? `?page=${page}&search=${search}` : `?page=${page}`;
  const response = await backendRequest(`food${query}`, "GET", true);
  return await response.json();
};

export const getAllFood = async () => {
  const response = await backendRequest(`food/all`, "GET", true);
  return await response.json();
};

export const createFood = async (
  name: string,
  quantity: number,
  unit: string
) => {
  const response = await backendRequest("food", "POST", true, {
    name,
    quantity,
    unit,
  });
  return response.status;
};

export const updateFood = async (food: Food) => {
  const response = await backendRequest(`food/${food.id}`, "PUT", true, food);
  return response.status;
};

export const deleteFood = async (foodId: number) => {
  const response = await backendRequest(`food/${foodId}`, "DELETE", true);
  return response.status;
};
