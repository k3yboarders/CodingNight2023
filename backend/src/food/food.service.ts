import { Injectable } from '@nestjs/common';
import { FoodDto } from './dto/food.dto';
import { DbService } from 'src/db/db.service';

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

  async addFood(foodId: number, quantityToAdd: number) {
    const currentQuantity = (
      await this.prisma.food.findUniqueOrThrow({
        where: {
          id: foodId,
        },
        select: {
          quantity: true,
        },
      })
    ).quantity;

    await this.prisma.food.update({
      where: {
        id: foodId,
      },
      data: {
        quantity: currentQuantity + quantityToAdd,
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

  async removeFoodSupply(foodId: number, quantityToRemove: number) {
    const currentQuantity = (
      await this.prisma.food.findUniqueOrThrow({
        where: {
          id: foodId,
        },
        select: {
          quantity: true,
        },
      })
    ).quantity;

    await this.prisma.food.update({
      where: {
        id: foodId,
      },
      data: {
        quantity: currentQuantity - quantityToRemove,
      },
    });
  }
}
