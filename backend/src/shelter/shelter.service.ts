import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ShelterDto } from './dto/shelter.dto';

@Injectable()
export class ShelterService {
  constructor(private readonly prisma: DbService) {}

  async getShelters(page: number) {
    const data = await this.prisma.shelter.findMany({
      skip: (page - 1) * 10,
      take: 10,
      select: {
        id: true,
        longitude: true,
        latitude: true,
      },
    });
    const totalItems = await this.prisma.shelter.count();
    return { data, totalItems, totalPages: Math.ceil(totalItems / 10) };
  }

  async getShelter(id: number) {
    return await this.prisma.shelter.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        longitude: true,
        latitude: true,
      },
    });
  }

  async createShelter(dto: ShelterDto) {
    return await this.prisma.shelter.create({
      data: {
        longitude: dto.longitude,
        latitude: dto.latitude,
        capacity: dto.capacity,
      },
    });
  }

  async getShelterById(id: number) {
    return await this.prisma.shelter.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        longitude: true,
        latitude: true,
        capacity: true,
      },
    });
  }

  async updateShelter(id: number, dto: ShelterDto) {
    await this.prisma.shelter.update({
      where: {
        id: id,
      },
      data: {
        longitude: dto.longitude,
        latitude: dto.latitude,
        capacity: dto.capacity,
      },
    });
  }

  async deleteShelter(id: number) {
    await this.prisma.shelter.delete({
      where: {
        id: id,
      },
    });
  }
}
