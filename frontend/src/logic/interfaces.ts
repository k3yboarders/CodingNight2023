export enum UserType {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  VOLUNTEER = "VOLUNTEER",
}
export interface User {
  id: number;
  username: string;
  email: string;
  type: UserType;
}

export interface Task {
  id: number;
  name: string;
  urgency: number;
  longitude: number;
  latitude: number;
  isCompleted: boolean;
}