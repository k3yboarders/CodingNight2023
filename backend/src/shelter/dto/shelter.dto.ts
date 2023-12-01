import { IsInt, IsNumber } from 'class-validator';

export class ShelterDto {
  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsInt()
  capacity: number;
}
