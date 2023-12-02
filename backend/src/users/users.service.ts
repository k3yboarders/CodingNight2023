import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UserDto } from './dto/user.dto';
import { UserType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DbService) {}

  async getUsers(page = 1, type?: UserType, search?: string) {
    const whereParams = {};
    if (search) {
      Object.assign(whereParams, {
        OR: [
          {
            email: {
              contains: search,
            },
          },
          {
            username: {
              contains: search,
            },
          },
        ],
      });
    }
    if (type) {
      Object.assign(whereParams, {
        type
      });
    }

    const data = await this.prisma.user.findMany({
      skip: page === 1 ? 0 : (page - 1) * 10,
      take: 10,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
      where: whereParams,
    });
    const totalItems = await this.prisma.user.count({
      where: whereParams,
    });
    return { data, totalItems, totalPages: Math.ceil(totalItems / 10) };
  }
  async getUser(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async updateUser(id: number, dto: UserDto) {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: dto.email,
        username: dto.username,
        type: dto.type,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
