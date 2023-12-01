import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AssignTaskDto {

    @IsNumber()
    @IsPositive()
    taskId: number;

    @IsNumber()
    @IsPositive()
    userId: number;
}