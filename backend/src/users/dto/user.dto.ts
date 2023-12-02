import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
