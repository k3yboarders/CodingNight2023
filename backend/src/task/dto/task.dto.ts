import {
  IsNotEmpty,
  IsNumber,
  IsPort,
  IsPositive,
  IsString,
} from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  urgency: number;

  @IsNumber()
  longitude: number;
  @IsNumber()
  latitude: number;
}
