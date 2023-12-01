import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Patch,
  Delete,
  Param,
  Get,
  Query
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from './dto/food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFoods(@Query('page') page = 1, @Query('search') search?: string): Promise<object> {
    return await this.foodService.getAllFoods(page, search);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFood(@Body() food: FoodDto): Promise<void> {
    await this.foodService.createFood(food);
  }

  @Patch('add')
  @HttpCode(HttpStatus.OK)
  async addFood(
    @Body('foodId') foodId: number,
    @Body('quantity') quantityToAdd,
  ): Promise<void> {
    await this.foodService.addFood(foodId, quantityToAdd);
  }

  @Delete(':foodId')
  @HttpCode(HttpStatus.OK)
  async deleteFood(@Param('foodId') foodId: number): Promise<void> {
    await this.foodService.deleteFood(foodId);
  }

  @Patch('remove')
  @HttpCode(HttpStatus.OK)
  async removeFoodSupply(
    @Body('foodId') foodId: number,
    @Body('quantity') quantityToRemove: number,
  ): Promise<void> {
    await this.foodService.removeFoodSupply(foodId, quantityToRemove);
  }
}
