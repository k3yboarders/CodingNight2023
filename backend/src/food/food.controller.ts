import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Delete,
  Param,
  Put,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from './dto/food.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/adminGuard';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFoods(
    @Query('page') page = 1,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.foodService.getAllFoods(page, search);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getEntireFoodStock(): Promise<object> {
    return await this.foodService.getEntireFoodStock();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFood(@Body() food: FoodDto): Promise<void> {
    await this.foodService.createFood(food);
  }

  @Put(':foodId')
  @HttpCode(HttpStatus.OK)
  async updateFood(
    @Param('foodId') foodId: number,
    @Body() food: FoodDto,
  ): Promise<void> {
    await this.foodService.updateFood(foodId, food);
  }

  @Delete(':foodId')
  @HttpCode(HttpStatus.OK)
  async deleteFood(@Param('foodId') foodId: number): Promise<void> {
    await this.foodService.deleteFood(foodId);
  }
}
