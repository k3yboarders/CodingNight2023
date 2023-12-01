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
  createdAt: Date;
  updatedAt: Date;
}
