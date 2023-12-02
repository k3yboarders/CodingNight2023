import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ShelterDto } from './dto/shelter.dto';

@Injectable()
export class ShelterService {
  constructor(private readonly prisma: DbService) {}

  async getShelters() {
    return await this.prisma.shelter.findMany({
      select: {
        id: true,
        longitude: true,
        latitude: true,
        isPublic: true,
      },
    });
  }

  async getSheltersPublic() {
    return await this.prisma.shelter.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        longitude: true,
        latitude: true,
        isPublic: true,
      },
    });
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
