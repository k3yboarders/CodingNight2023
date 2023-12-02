import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
