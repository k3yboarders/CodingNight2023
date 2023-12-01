import { Controller, Post, Body, HttpStatus, HttpCode, Patch, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from './dto/food.dto';

@Controller('food')
export class FoodController {
    
    constructor(private readonly foodService: FoodService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createFood(@Body() food: FoodDto): Promise<void> {
        await this.foodService.createFood(food);
    }

    @Patch('add')
    @HttpCode(HttpStatus.OK)
    async addFood(@Body('foodId') foodId: number, @Body('quantity') quantityToAdd): Promise<void> {
        await this.foodService.addFood(foodId, quantityToAdd);
    }

    @Delete('delete')
    @HttpCode(HttpStatus.OK)
    async deleteFood(@Body('foodId') foodId: number): Promise<void> {
        await this.foodService.deleteFood(foodId);
    }

    @Patch('remove')
    @HttpCode(HttpStatus.OK)
    async removeFoodSupply(@Body('foodId') foodId: number, @Body('quantity') quantityToRemove: number): Promise<void> {
        await this.foodService.removeFoodSupply(foodId, quantityToRemove);
    }
}
