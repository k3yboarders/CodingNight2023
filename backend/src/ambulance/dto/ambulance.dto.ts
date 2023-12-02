import { IsBoolean, IsNumber, IsPositive } from "class-validator";

export class AmbulanceDto {
  @IsNumber()
  longitude: number;
  @IsNumber()
  latitude:  number;
  @IsBoolean()
  isAvailable: boolean;
  @IsNumber()
  @IsPositive()
  driverId: number;
}