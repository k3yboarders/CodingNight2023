import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
enum UserType {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  DRIVER = 'DRIVER'
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserType)
  type: UserType
}
