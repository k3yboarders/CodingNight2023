import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

enum UserType {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  DRIVER = 'DRIVER',
}
export class JwtAuthDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsEnum(UserType)
  type: UserType;
}
