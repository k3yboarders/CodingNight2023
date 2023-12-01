import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class FoodDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  unit: string;
}
