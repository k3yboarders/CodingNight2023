import { Injectable } from '@nestjs/common';
import { FoodDto } from './dto/food.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: DbService) {}
  async createFood(dto: FoodDto): Promise<void> {
    await this.prisma.food.create({
      data: {
        name: dto.name,
        quantity: dto.quantity,
        unit: dto.unit,
      },
    });
  }

  async getAllFoods(page = 1, search?: string): Promise<object> {
    let whereParams = {};
    if (search) {
      whereParams = {
        name: {
          contains: search,
        },
      };
    }

    const data = await this.prisma.food.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: whereParams,
    });
    const totalItems = await this.prisma.food.count();

    return {
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / 10),
    };
  }

  async updateFood(foodId: number, dto: FoodDto): Promise<void> {
    await this.prisma.food.update({
      where: {
        id: foodId,
      },
      data: {
        name: dto.name,
        quantity: dto.quantity,
        unit: dto.unit,
      },
    });
  }

  async deleteFood(foodId: number) {
    await this.prisma.food.delete({
      where: {
        id: foodId,
      },
    });
  }
}
