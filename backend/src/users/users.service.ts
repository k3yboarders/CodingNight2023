import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DbService) {}

  async getUsers(page: number) {
    const data = await this.prisma.user.findMany({
      skip: page * 10,
      take: 10,
      select: {
        id: true,
        email: true,
        username: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const totalItems = await this.prisma.user.count();
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