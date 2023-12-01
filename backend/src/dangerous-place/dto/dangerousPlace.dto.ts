import { IsNotEmpty, IsString, IsNumber, IsEnum, Max, Min } from "class-validator";

enum DangerType {
  BOMBING = 'BOMBING',
  TERRORIST_ATTACK = 'TERRORIST_ATTACK',
  EARTHQUAKE = 'EARTHQUAKE',
  TSUNAMI = 'TSUNAMI',
  TORNADO = 'TORNADO',
  FAMINE = 'FAMINE',
  ROAD_ACCIDENT = 'ROAD_ACCIDENT',
//  EPIDEMIC = 'EPIDEMIC'
}

export class DangerousPlaceDto {
    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsEnum(DangerType)
    dangerType: DangerType;

    @IsNumber()
    @Min(1)
    @Max(10)
    severity: number;
}