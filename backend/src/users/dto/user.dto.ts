import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';

export enum UserType {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  DRIVER = 'DRIVER',
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEnum(UserType)
  type: UserType;
}
