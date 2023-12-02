import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

enum DangerType {
  BOMBING = 'BOMBING',
  TERRORIST_ATTACK = 'TERRORIST_ATTACK',
  EARTHQUAKE = 'EARTHQUAKE',
  TSUNAMI = 'TSUNAMI',
  TORNADO = 'TORNADO',
  FAMINE = 'FAMINE',
  ROAD_ACCIDENT = 'ROAD_ACCIDENT',
}
export class ReportDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsNumber()
  readonly longitude: number;

  @IsNumber()
  readonly latitude: number;

  @IsEnum(DangerType)
  readonly type: DangerType;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly ambulanceId: number;
}
